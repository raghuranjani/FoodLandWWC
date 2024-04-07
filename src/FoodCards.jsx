const FoodCards = (props) => {
    // instead of writing below code
    // const foodItem = props.foodItem
    // object destructuring
    const { foodItem } = props;
    return (
        <article className={'food'}>
            <header>
                <p>Quantity - {foodItem.quantity}</p>
            </header>

            <section>
                <img
                    src={foodItem.image_front_url ? foodItem.image_front_url : 'N/A'}
                    alt={foodItem.product_name}
                />
            </section>

            <footer>
                <span>expires on {foodItem.expiration_date}</span>
                <h3>{foodItem.product_name}</h3>
            </footer>
        </article>
    );
};

export default FoodCards;
