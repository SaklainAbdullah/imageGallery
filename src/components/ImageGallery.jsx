import { useState } from 'react'




const ImageGallery = () => {
  const [images, setImages] = useState([]); // State to store images
  const [selectedImages, setSelectedImages] = useState([]); // State to store selected images

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(), // Generate a unique id for the image
          url: reader.result,
          isSelected: false,
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedImages = [...images];
    updatedImages[index].isSelected = !updatedImages[index].isSelected;
    setImages(updatedImages);

    const selectedImageIds = updatedImages
      .filter((image) => image.isSelected)
      .map((image) => image.id);
    setSelectedImages(selectedImageIds);
  };

  const handleImageDelete = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = e.dataTransfer.getData('index');
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, movedImage);
    setImages(updatedImages);
  };

  return (
    <div className='bg-gray-200 mx-auto p-4 h-[100vh] w-[100vh]' >
        
    <div className=" shadow-lg p-4 bg-white mx-auto rounded-[10px] w-[95vh] h-[95vh]">
    <div className='flex  border-b-[1px] items-center justify-between'>
      
    {selectedImages.length>0?(<h2 className='font-[600] text-[20px] '>{(selectedImages.length>1?selectedImages.length +" files selected":selectedImages.length +" file selected")}</h2>):(<h2 className='font-[600] text-[20px] '>Gallery</h2>)}
        {selectedImages.length>0?(<button className='text-red-700' onClick={handleImageDelete}>Delete files</button>):""}
        </div>
        <br className='font-[600]'/>
      <div className="flex items-start justify-around grid  grid-cols-4 sm:grid-cols-5">
        {images.map((image, index) => (
          index===0?(<div
            key={image.id}
            className={`w-[255px] m-1 h-[255px] row-span-2 border border-gray-300 col-span-2 rounded-[10px] relative inline-block  ${image.isSelected ? 'selected opacity-50' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            
            <input
              className={`absolute h-[20px] hover:block hover:z-[2] w-[20px] top-[10%] left-[10%] cursor-pointer ${image.isSelected ? 'block':'hidden'} `}
              id={index}
              type="checkbox"
              checked={image.isSelected}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={index}>
            <img id={index} className='rounded-[10px] hover:brightness-50 cursor-pointer' src={image.url} alt={`Image ${index}`} />
            </label>
          </div>):(<div
            key={image.id}
            className={`w-[123px] m-1 h-[123px] border border-gray-300 rounded-[10px] relative inline-block  ${image.isSelected ? 'selected opacity-50' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            
            <input
              className={`absolute h-[20px] hover:block hover:z-[2] w-[20px] top-[10%] left-[10%] cursor-pointer ${image.isSelected ? 'block':'hidden'} `}
              id={index}
              type="checkbox"
              checked={image.isSelected}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={index}>
            <img  id={index} className='rounded-[10px] hover:brightness-50 cursor-pointer' src={image.url} alt={`Image ${index}`} />
            </label>
          </div>)
        ))}
        <div >
        <label htmlFor="image1" className='inline-block border border-2 rounded-[10px] bg-gray-50 border-dashed border-gray  py-[50px] px-[22px] m-1 whitespace-nowrap cursor-pointer'>Add Image</label>
         <input id="image1" type="file" className="hidden" clasaccept="image/*" onChange={handleImageUpload} />
         </div>
      </div>
      
    </div>
    </div>
  );
};




export default ImageGallery
