import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useCart } from 'react-use-cart';
import Notiflix from 'notiflix';

import img1 from './img/photo_1_2024-11-30_13-26-41.jpg'
import img2 from './img/photo_2_2024-11-30_13-26-41.jpg'
import img3 from './img/photo_3_2024-11-30_13-26-41.jpg'
import img4 from './img/photo_4_2024-11-30_13-26-41.jpg'
import img5 from './img/photo_5_2024-11-30_13-26-41.jpg'
import img6 from './img/photo_6_2024-11-30_13-26-41.jpg'
import img7 from './img/photo_7_2024-11-30_13-26-41.jpg'
import img8 from './img/photo_8_2024-11-30_13-26-41.jpg'
import img9 from './img/photo_9_2024-11-30_13-26-41.jpg'

const products = [
  { id: 1, name: 'Спортивний костюм Lost Mary', price: 2700, image: img1, size: 'S, M L, XL' },
  { id: 2, name: 'Футболка Elbar', price: 800, image: img2, size: 'S, M L, XL'  },
  { id: 3, name: 'Світшот Lost Mary', price: 1700, image: img3, size: 'S, M L, XL'  },
  { id: 4, name: 'Спортивний костюм VOZOL', price: 2200, image: img4, size: 'S, M L, XL'  },
  { id: 5, name: 'Спортивний костюм Elfbar', price: 2200, image: img5, size: 'S, M L, XL'  },
  { id: 6, name: 'Свій принт', price: 1500, image: img6, size: 'S, M L, XL'  },
  { id: 7, name: 'Світшот свій принт', price: 1750, image: img7, size: 'S, M L, XL'  },
  { id: 8, name: 'Світшот Elfbar', price: 1700, image: img8, size: 'S, M L, XL'  },
  { id: 9, name: 'Світшот Elfbar', price: 1350, image: img9, size: 'S, M L, XL'  },
];

function ProductList() {
  const { addItem } = useCart();

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card
            sx={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Додає тінь
              transition: 'transform 0.2s, box-shadow 0.2s', // Додає ефект при наведенні
              '&:hover': {
                transform: 'scale(1.05)', // Збільшує картку при наведенні
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Посилює тінь при наведенні
              },
            }}
          >
            <CardMedia component="img" height="250" image={product.image} alt={product.name} />
            <CardContent>
              <Typography variant="h7">{product.name}</Typography>
              <br />
              <br />
              <Typography variant="h9" color="text">
                Розмір: {product.size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ціна: {product.price} грн
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addItem(product); 
                  Notiflix.Notify.init({
                    position: 'right-bottom', // Позиція сповіщення: знизу праворуч
                  });
                  Notiflix.Notify.success(`Замовлення ${product.name} додано до кошику`); 
                }}
                style={{ marginTop: '10px' }}
                sx={{
                  backgroundColor: '#ff5100', 
                  '&:hover': { backgroundColor: '#e64a00' }, 
                  color: '#fff', 
                }}
                
              >
                Додати в кошик
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
