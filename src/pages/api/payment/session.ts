import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')('')

export default async function payment(_req: NextApiRequest, res: NextApiResponse) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_xxxxxxxxxxxxxxxx',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
    })
    res.json({ id: session.id })
}