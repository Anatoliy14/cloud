import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from 'react-use-cart';

function Cart({ open, onClose, onOrderClick }) {
  const { items, removeItem, isEmpty, cartTotal, updateItemQuantity } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 20 }}>
        <Typography variant="h6" gutterBottom>
          Ваш кошик
        </Typography>
        {isEmpty ? (
          <Typography>Кошик порожній</Typography>
        ) : (
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={item.name}
                    secondary={`Ціна: ${item.price} грн`}
                  />
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => removeItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        {!isEmpty && (
          <>
            <Typography variant="h6" gutterBottom>
              Всього: {cartTotal} грн
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={onOrderClick}
              sx={{
                backgroundColor: '#ff5100', // Колір фону
                '&:hover': { backgroundColor: '#e64a00' }, // Колір при наведенні
                color: '#fff', // Колір тексту
              }}
            >
              Оформити замовлення
            </Button>
          </>
        )}
      </div>
    </Drawer>
  );
}

export default Cart;
