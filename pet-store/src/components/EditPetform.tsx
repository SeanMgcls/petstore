import React, { useState } from 'react';
import petService from '../services/petService'; // Import petService for API calls
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  image: string;
  description: string;
  price: number;
}

const EditPetForm: React.FC<{ pet: Pet; onUpdate: () => void }> = ({
  pet,
  onUpdate,
}) => {
  const [name, setName] = useState(pet.name);
  const [species, setSpecies] = useState(pet.species);
  const [breed, setBreed] = useState(pet.breed);
  const [gender, setGender] = useState(pet.gender);
  const [image, setImage] = useState(pet.image);
  const [description, setDescription] = useState(pet.description);
  const [price, setPrice] = useState<number | ''>(pet.price);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petService.updatePet(pet.id, {
        name,
        species,
        breed,
        gender,
        image,
        description,
        price,
      });
      onUpdate(); // Refresh after update
    } catch (err) {
      console.error(err);
      setError('Failed to update pet. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Pet
      </Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
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
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditPetForm;