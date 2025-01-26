const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntegration = async (req, res) => {
    try {
        const { Gifts, Quantity } = req.body; // Use Quantity from the request body
        if (!Array.isArray(Gifts) || Gifts.length === 0) {
            return res.status(400).json({ error: 'Gifts should be a non-empty array' });
        }

        const line_items = await Promise.all(Gifts.map(async (item, index) => {
            // Validate item based on your Gift schema
            if (!item.description || !item.price) {
                throw new Error('Each item must have a description and price');
            }

            // Create a product in Stripe first, if you want to store them
            const product = await stripe.products.create({
                name: item.description, // Use description for product name
            });
            
            return {
                price_data: {
                    currency: 'usd', // Use the correct currency code
                    product: product.id, // Use the created product ID
                    unit_amount: item.price * 100, // Price in cents
                },
                quantity: Quantity[index] || 1, // Use the corresponding quantity
            };
        }));
        console.log(line_items);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/giftcard?success=true', // Add query parameter
            cancel_url: 'http://localhost:5173/giftcard?canceled=true', // Add query parameter
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


module.exports = paymentIntegration;
