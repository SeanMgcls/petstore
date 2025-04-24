import React, { useState, useEffect } from 'react';
import PetList from './components/PetList';
import AddPetForm from './components/AddPetForm';
import EditPetForm from './components/EditPetForm';
import petService from './services/petService';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      const data = await petService.getAllPets();
      setPets(data);
    };
    fetchPets();
  }, []);

  const handleDelete = (id: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Pet Store
      </Typography>
      {editingPet ? (
        <EditPetForm pet={editingPet} onUpdate={() => setEditingPet(null)} />
      ) : (
        <>
          <AddPetForm onAdd={() => {}} />
          <PetList pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </Container>
  );
};

export default App;