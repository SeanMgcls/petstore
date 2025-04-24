import React, { useState } from 'react';
import petService from '../services/petService';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';

const AddPetForm: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petService.createPet({ name, species, breed, gender, image, description, price });
      setMessage('Pet added successfully.');
      setName('');
      setSpecies('');
      setBreed('');
      setGender('');
      setImage('');
      setDescription('');
      setPrice('');
      onAdd(); // Notify parent to update the list
    } catch (err) {
      console.error(err);
      setMessage('Failed to add pet.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add a New Pet
      </Typography>
      {message && <Typography color="error" gutterBottom>{message}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Pet
        </Button>
      </Box>
    </Container>
  );
};

export default AddPetForm;