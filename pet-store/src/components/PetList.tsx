import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import petService from '../services/petService'; // Import petService for API calls

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  price: number;
  description: string;
  image: string;
}

const PetList: React.FC<{ pets: Pet[]; onEdit: (pet: Pet) => void; onDelete: (id: number) => void }> = ({
  pets,
  onEdit,
  onDelete,
}) => {
  const deletePet = async (id: number) => {
    try {
      await petService.deletePet(id); // Call the DELETE API
      onDelete(id); // Notify parent to update the state
    } catch (err) {
      console.error('Failed to delete pet:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pet List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <img
                    src={pet.image}
                    alt={pet.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.species}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>${pet.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(pet)}>
                    Edit
                  </Button>{' '}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      console.log('Deleting pet with ID:', pet.id);
                      deletePet(pet.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PetList;