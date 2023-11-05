import Sneaker from "../models";

// Función para encontrar todos los sneakers con opciones de paginación
async function findAllSneakers() {
  const sneakers = await Sneaker.find();
  return sneakers;
}

// Función para encontrar todos los sneakers con filtros
async function findAllSneakersWithFilter(filterDto: any) {
  let sneakers = await Sneaker.find();
  if (filterDto && filterDto.name) {
    sneakers = sneakers.filter((sneaker) =>
      sneaker.name.toUpperCase().includes(filterDto.name)
    );
  }
  if (filterDto && filterDto.genre) {
    sneakers = sneakers.filter((sneaker) =>
      sneaker.genre.toUpperCase().includes(filterDto.genre)
    );
  }
  if (filterDto && filterDto.brand) {
    sneakers = sneakers.filter((sneaker) =>
      sneaker.brand.toUpperCase().includes(filterDto.brand)
    );
  }
  return sneakers;
}

// Función para encontrar un sneaker por su ID
async function findSneakerById(sneakerID: any) {
  const sneaker = await Sneaker.findById(sneakerID);
  return sneaker;
}

// Función para crear un nuevo sneaker
async function createSneaker(sneakerData: any, image: any) {
  const newSneaker = new Sneaker({
    ...JSON.parse(sneakerData.sneaker),
    posterPathImage: image,
  });

  const savedSneaker = await newSneaker.save();

  return savedSneaker;
}

// Función para actualizar un sneaker por su ID
async function updateSneaker(sneakerID: any, sneakerData: any, image: any) {
  const prevItem = await Sneaker.findById(sneakerID);
  let updatedSneaker = {
    ...JSON.parse(sneakerData.sneaker),
    posterPathImage: image,
  };

  const updatedSneakerDocument = await Sneaker.findByIdAndUpdate(
    sneakerID,
    updatedSneaker,
    { new: true }
  );

  if (updatedSneakerDocument) {
    // Añade lógica para eliminar la imagen anterior con Cloudinary
  }

  return updatedSneakerDocument;
}

// Función para eliminar un sneaker por su ID
async function deleteSneaker(sneakerID: any) {
  const prevItem = await Sneaker.findById(sneakerID);
  const deletedSneaker = await Sneaker.findByIdAndDelete(sneakerID);

  if (deletedSneaker) {
    // Añade lógica para eliminar la imagen anterior con Cloudinary
  }

  return deletedSneaker;
}

// Función para agregar imágenes a un sneaker por su ID
// async function putImagesOnSneaker(sneakerID: any, images: any) {
//   const sneaker = await Sneaker.findById(sneakerID);
//   sneaker.imgs = images;

//   const updatedSneaker = await Sneaker.findByIdAndUpdate(sneakerID, sneaker, {
//     new: true,
//   });

//   return updatedSneaker;
// }

module.exports = {
  findAllSneakers,
  findAllSneakersWithFilter,
  findSneakerById,
  createSneaker,
  updateSneaker,
  deleteSneaker,
};
