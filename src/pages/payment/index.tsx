import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_xxxxxxxxxxxx')

function Payment() {
    const createPaymentSession = async () => {
        const stripe = await stripePromise
        if (stripe) {
            const res = await axios.post('/api/payment/session')
            const result = await stripe.redirectToCheckout({
                sessionId: res.data.id,
            })
            if (result.error) {
                alert(result.error.message)
            }
        }
    }

    return (
        <div>
            <section>
                <div>
                    <h3>Tシャツ</h3>
                    <h5>2,000円</h5>
                </div>
                <div>
                    <button onClick={createPaymentSession}>購入する</button>
                </div>
            </section>
        </div>
    )
}

export default Payment