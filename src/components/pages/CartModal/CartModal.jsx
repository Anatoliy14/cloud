import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from 'react-use-cart';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function CartModal({ open, onClose }) {
  const { items, removeItem, isEmpty, cartTotal } = useCart();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Ваш кошик
        </Typography>
        {isEmpty ? (
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Кошик порожній
          </Typography>
        ) : (
          <>
            <List>
              {items.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Ціна: ${item.price} грн, Кількість: ${item.quantity}`}
                  />
                  <IconButton edge="end" onClick={() => removeItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Всього: {cartTotal} грн
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: '#ff5100', // Колір фону
                '&:hover': { backgroundColor: '#e64a00' }, // Колір при наведенні
                color: '#fff', // Колір тексту
              }}
              onClick={() => {
                alert('Замовлення оформлене!');
                onClose();
              }}
            >
              Оформити замовлення
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default CartModal;
