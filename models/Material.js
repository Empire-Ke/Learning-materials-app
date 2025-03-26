const materials = [];

let nextMaterialId = 1;

const findMaterials = () => materials;

const saveMaterial = (material) => {
  material.id = nextMaterialId++;
  materials.push(material);
  return material;
};

module.exports = {
  findMaterials,
  saveMaterial,
  materials // Exporting materials array for testing purposes
};