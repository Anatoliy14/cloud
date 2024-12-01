import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { useCart } from 'react-use-cart';
import axios from 'axios';
import Notiflix from 'notiflix';
import {CHAT, URI_API } from './tg';


// Адаптивний стиль для модального вікна
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: 400 }, // 90% ширини для мобільних, 80% для планшетів, фіксована ширина для десктопів
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 4 }, // Зменшений відступ для мобільних
  borderRadius: '10px',
  maxHeight: '90vh', // Обмеження висоти для мобільних пристроїв
  overflowY: 'auto', // Прокрутка, якщо контент не вміщується
};

function OrderModal({ open, onClose }) {
  const { items, cartTotal, emptyCart } = useCart();
  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('+380');

  const handleOrderConfirm = () => {
    if (receiverName.trim() === '') {
      Notiflix.Notify.failure('Введіть ім’я');
      return;
    }
    if (phone.trim() === '+380' || phone.length !== 13) {
      Notiflix.Notify.failure('Введіть коректний номер телефону');
      return;
    }
    if (items.length === 0) {
      Notiflix.Notify.failure('Ваш кошик порожній');
      return;
    }

    let orderMessage = '';
    items.forEach((item) => {
      orderMessage += `➤<b>${item.name}</b> - ${item.quantity} шт., ${item.price * item.quantity} грн\n`;
    });

    axios
      .post(URI_API, {
        chat_id: CHAT,
        parse_mode: 'html',
        text: `<b>Новий заказ</b>\n<b>Ім'я:</b> ${receiverName}\n<b>Номер:</b> ${phone}\n<b>Замовлення:\n</b>${orderMessage}\n<b>Загальна сума:</b> ${cartTotal} грн`,
      })
      .then((res) => {
        Notiflix.Notify.success('Замовлення відправлено');
        emptyCart();
        setReceiverName('');
        setPhone('+380');
        onClose();
      })
      .catch((err) => {
        Notiflix.Notify.failure('Виникла помилка під час відправки замовлення');
      });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Підтвердження замовлення
        </Typography>
        <List sx={{ mt: 2 }}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <img src={item.image} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
              <ListItemText
                primary={item.name}
                secondary={`Ціна: ${item.price} грн, Кількість: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Всього до сплати: {cartTotal} грн
        </Typography>
        <TextField
          fullWidth
          label="Ваше ім’я"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Номер телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#60f742',
            '&:hover': { backgroundColor: '#358026' },
            color: '#fff',
          }}
          onClick={handleOrderConfirm}
        >
          Підтвердити замовлення
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#ff5100',
            '&:hover': { backgroundColor: '#e64a00' },
            color: '#fff',
          }}
          onClick={onClose}
        >
          Скасувати
        </Button>
      </Box>
    </Modal>
  );
}

export default OrderModal;
