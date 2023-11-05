import Sneaker from "../models";
import { deleteImage } from "../cloudinary";
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
async function findSneakerById(sneakerID: string) {
  const sneaker = await Sneaker.findById(sneakerID);
  return sneaker;
}
// Función para crear un nuevo sneaker
async function createSneaker(sneakerData: any, image: Express.Multer.File) {
  const newSneaker = new Sneaker({
    ...JSON.parse(sneakerData),
    posterPathImage: image,
  });

  const savedSneaker = await newSneaker.save();
  return savedSneaker;
}
// Función para actualizar un sneaker por su ID
async function updateSneaker(sneakerID: string, sneakerData: any) {
  const updatedSneakerDocument = await Sneaker.findByIdAndUpdate(
    sneakerID,
    sneakerData,
    { new: true }
  );
  return updatedSneakerDocument;
}
// Función para eliminar un sneaker por su ID
async function deleteSneaker(sneakerID: string) {
  const prevItem = await Sneaker.findById(sneakerID);
  const deletedSneaker = await Sneaker.findByIdAndDelete(sneakerID);

  if (deletedSneaker && prevItem) {
    await deleteImage(prevItem.posterPathImage);
  }

  return deletedSneaker;
}
async function deleteImageSneaker(
  sneakerID: string,
  imageID: string,
  type: string
) {
  if (type === "poster") {
    const updatedSneaker = await Sneaker.findByIdAndUpdate(
      sneakerID,
      { $set: { posterPathImage: "" } },
      { new: true }
    );

    if (updatedSneaker) {
      await deleteImage(`sneaker/${imageID}`);
    }
    return updatedSneaker;
  } else if (type === "image") {
    const updatedSneaker = await Sneaker.findByIdAndUpdate(
      sneakerID,
      { $pull: { imgs: `sneaker/${imageID}` } },
      { new: true }
    );

    if (updatedSneaker) {
      await deleteImage(`sneaker/${imageID}`);
    }

    return updatedSneaker;
  }
}
// Función para agregar imágenes a un sneaker por su ID
async function putImagesOnSneaker(sneakerID: any, images: any) {
  const sneaker = await Sneaker.findById(sneakerID);
  if (sneaker) {
    sneaker.imgs = images;
    const updatedSneaker = await Sneaker.findByIdAndUpdate(sneakerID, sneaker, {
      new: true,
    });
    return updatedSneaker;
  } else {
    throw new Error("Sneaker no encontrada");
  }
}

module.exports = {
  findAllSneakers,
  findAllSneakersWithFilter,
  findSneakerById,
  createSneaker,
  updateSneaker,
  deleteSneaker,
  deleteImageSneaker,
  putImagesOnSneaker,
};
