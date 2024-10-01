// Storefront API URL та Access Token
const apiUrl = 'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json';
const accessToken = '7e174585a317d187255660745da44cc7';

// GraphQL запит для отримання списку товарів
const query = `
  {
    products(first: 8) {
      edges {
        node {
          title
          description
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Помилка при отриманні даних з API');
    }

    const result = await response.json();
    const products = result.data.products.edges;
    displayProducts(products);
  } catch (error) {
    console.error('Помилка:', error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById('products__cards');

  products.forEach(({ node }) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product__card');

    const image2 = node.images.edges[1]?.node.url || '';
    const price = node.variants.edges[0]?.node.price.amount || '';
    const currency = node.variants.edges[0]?.node.price.currencyCode || '';

    productCard.innerHTML = `
      <div class="image__container">
        <img src="${image2}" alt="${node.images.edges[1]?.node.altText}" class="image_2">
      </div>
      <div class="product__desc">
        <div class="product__title">${node.title}</div>
        <div class="product_img_desc">Lorem ipsum dolor sit amet</div>
        <div class="product__price"><s>${price}</s>${price} ${currency}</div>
      </div>
    `;

    productContainer.appendChild(productCard);
  });
}

// Виклик функції для отримання продуктів
fetchProducts();

// FAQ функціонал
const faqItems = document.querySelectorAll('.faq_question_container');

faqItems.forEach(item => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');
  const faq__icon = item.querySelector('.faq__icon');

  question.addEventListener('click', () => {
    answer.classList.toggle('open');
    item.classList.toggle('faq_question_container_open');
    faq__icon.src = faq__icon.src.includes('close.png') ? 'imgs/open.png' : 'imgs/close.png';
  });
});
