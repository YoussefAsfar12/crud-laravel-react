// import  { useState } from 'react';
// import axios from 'axios';

// function ImageUploader() {
//   const [image, setImage] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleImageUpload = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append('image', image);
//     // const formData={
//     //     image:image
//     // }
//     try {
//       const response = await axios.put(`http://localhost:8000/api/test/1`, formData);
//       console.log( response.data);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" name='image' onChange={handleImageChange} />
//       <button onClick={handleImageUpload}>Upload Image</button>
//       {uploadProgress > 0 && (
//         <div>Upload Progress: {uploadProgress}%</div>
//       )}
//     </div>
//   );
// }

// export default ImageUploader;







// ImageUpdateForm.jsx
import axios from 'axios';
import  { useState } from 'react';

const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }
    const formData ={
      image:file
    };
    try {
      console.log(formData);
      // const response = await axios.put("http://localhost:8000/api/update/2",formData);

      // // Handle the response as needed
      // console.log(response);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input type="file" name='image' onChange={handleFileChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default ImageUploader;