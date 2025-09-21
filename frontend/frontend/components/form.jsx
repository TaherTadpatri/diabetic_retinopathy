// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';

// function ImageUpload() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     imageType: '',
//   });
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [imageUrls,setProcessingUrls]=useState(null)

//   // Handle text input changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle checkbox changes (ensures only one option is selected)
//   const handleCheckboxChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setPrediction(null);
//     setError(null);

//     // Create image preview URL
//     if (selectedFile) {
//       const previewUrl = URL.createObjectURL(selectedFile);
//       setImagePreview(previewUrl);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate inputs
//     if (!formData.name || !formData.age || !formData.gender || !formData.imageType || !file) {
//       alert('Please fill all fields and select an image');
//       return;
//     }

//     // Create FormData object
//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('age', formData.age);
//     data.append('gender', formData.gender);
//     data.append('imageType', formData.imageType);
//     data.append('file', file);

//     try {
//       const response = await fetch('http://localhost:8000/predict', {
//         method: 'POST',
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       setPrediction(result.prediction);
//       setProcessingUrls(result.processed_urls)
//       console.log(preprocessedImage)
//       setError(null);
//       alert(`Image uploaded successfully! Prediction: ${result.prediction}`);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setError(error.message);
//       alert(`Failed to upload image: ${error.message}`);
//     }
//   };

//   // Clean up image preview URL to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Grid container spacing={3}>
//         {/* Form Section */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Upload Image for Prediction
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//               />
//               <TextField
//                 label="Age"
//                 name="age"
//                 type="number"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//               />
//               <FormControl component="fieldset" margin="normal">
//                 <FormLabel component="legend">Gender</FormLabel>
//                 <Box>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.gender === 'male'}
//                         onChange={handleCheckboxChange}
//                         name="gender"
//                         value="male"
//                       />
//                     }
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.gender === 'female'}
//                         onChange={handleCheckboxChange}
//                         name="gender"
//                         value="female"
//                       />
//                     }
//                     label="Female"
//                   />
//                 </Box>
//               </FormControl>
//               <FormControl component="fieldset" margin="normal">
//                 <FormLabel component="legend">Image Type</FormLabel>
//                 <Box>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.imageType === 'left'}
//                         onChange={handleCheckboxChange}
//                         name="imageType"
//                         value="left"
//                       />
//                     }
//                     label="Left"
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.imageType === 'right'}
//                         onChange={handleCheckboxChange}
//                         name="imageType"
//                         value="right"
//                       />
//                     }
//                     label="Right"
//                   />
//                 </Box>
//               </FormControl>
//               <Box marginY={2}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   style={{ display: 'block' }}
//                 />
//                  <Grid item xs={12} md={6}>
//                   {imagePreview && (
//                     <div>
//                       <Typography variant="h6" gutterBottom>
//                         Image Preview
//                       </Typography>
//                       <img
//                         src={imagePreview}
//                         alt="Uploaded Preview"
//                         style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
//                       />
//                       </div>
//                   )}
//                   </Grid>
//               </Box>
//               <Button type="submit" variant="contained" color="primary">
//                 Predict
//               </Button>
//               {prediction && (
//                 <Typography variant="body1" sx={{ marginTop: 2 }}>
//                   Prediction: {prediction}
//                 </Typography>
//               )}
//               {error && (
//                 <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
//                   Error: {error}
//                 </Typography>
//               )}
//             </form>
//           </Paper>
//         </Grid>

//         {/* Image Preview Section */}
//         {/* <Grid item xs={12} md={6}>
//           {imagePreview && (
//             <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
//               <Typography variant="h6" gutterBottom>
//                 Image Preview
//               </Typography>
//               <img
//                 src={imagePreview}
//                 alt="Uploaded Preview"
//                 style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
//               />
//             </Paper>
//           )} */}
//          {imageUrls && imageUrls.length > 0 && (
//         <>
//           <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
//             Preprocessed Images
//           </Typography>
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 2,
//               justifyContent: 'center',
//             }}
//           >
//             {imageUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`Preprocessed Image ${index + 1}`}
//                 style={{
//                   maxWidth: '100%',
//                   maxHeight: '300px',
//                   objectFit: 'contain',
//                   border: '1px solid #ddd',
//                   borderRadius: '4px',
//                 }}
//               />
//             ))}
//           </Box>
//         </>
//       )}
//         </Grid>
//     </Box>
//   );
// }

// export default ImageUpload;




import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import InformationDisplay from './information';
import exampleData from './examples';

function ProcessedImages({ imageUrls }) {
  return (
      <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'left',
            alignItems: 'left',
          }}
        >
          {imageUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 calc(50% - 8px)', // Two columns, accounting for gap
                maxWidth: 'calc(50% - 8px)',
              }}
            >
              <img
                src={url}
                alt={`Preprocessed Image ${index + 1}`}
                style={{
                  maxWidth: '90%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </Box>
          ))}
        </Box>
  );
}

function ImageUpload() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    imageType: '',
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [description, setDescription] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [riskFactors, setRiskFactors] = useState([]);
  const [remedies, setRemedies] = useState([]);
  const [careInstructions, setCareInstructions] = useState([]);
  const [complicationsIfUntreated, setComplicationsIfUntreated] = useState([]);
  const [supportResources, setSupportResources] = useState([]);
  const [isLoading,setLoading]=useState(false);

  // Handle text input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes (ensures only one option is selected)
  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleImageClick = async (example) => {

  let fileObject = null;
  try {
    const response = await fetch(example.file);
    const blob = await response.blob();
    fileObject = new File([blob], example.file, { type: blob.type });
  } catch (err) {
    console.error("Failed to fetch example image:", err);
    setError("Could not load example image");
  }
  setFormData({
    name: example.name,
    age: example.age.toString(),
    gender: example.gender, // Must be 'male' or 'female'
    imageType: example.imageType, // Must be 'left' or 'right'
  });
  setFile(example.file); // Reset actual file
  console.log(file)
  setPrediction(null); // Reset prediction
  setError(null); // Reset error
  setImageUrls([]); // Reset image URLs
  setDescription(''); // Reset description
  setSymptoms([]); // Reset symptoms
  setRiskFactors([]); // Reset risk factors
  setRemedies([]); // Reset remedies
  setCareInstructions([]); // Reset care instructions
  setComplicationsIfUntreated([]); // Reset complications
  setSupportResources([]); // Reset support resources
  setImagePreview(example.imageUrl); // Set image preview to example image URL
   if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
};
  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    setFile(selectedFile);
    setPrediction(null);
    setError(null);
    setImageUrls([]);
    setDescription('');
    setSymptoms([]);
    setRiskFactors([]);
    setRemedies([]);
    setCareInstructions([]);
    setComplicationsIfUntreated([]);
    setSupportResources([]);

    // Create image preview URL
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!formData.name || !formData.age || !formData.gender || !formData.imageType || !file) {
      setError('Please fill all fields and select an image');
      return;
    }

    // Create FormData object
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('imageType', formData.imageType);
    data.append('file', file);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setImageUrls(result.image_urls);
      setDescription(result.description);
      setSymptoms(result.symptoms);
      setRiskFactors(result.risk_factors);
      setRemedies(result.remedies);
      setCareInstructions(result.care_instructions);
      setComplicationsIfUntreated(result.complications_if_untreated);
      setSupportResources(result.support_resources);
      setLoading(false)
      setError(null);
    } catch (error) {
      setLoading(false)
      console.error('Error uploading image:', error);
      setError(error.message);
    }
    finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
      <Grid container spacing={1}  direction="row" sx={{padding : 3}}>
        <Grid container item spacing={2}>
        <Grid  item xs={12} md={3} lg={3} direction="column">
          <Box elevation={3} sx={{ padding: 3, maxWidth: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Upload Image for Prediction
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Gender</FormLabel>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.gender === 'male'}
                        onChange={handleCheckboxChange}
                        name="gender"
                        value="male"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.gender === 'female'}
                        onChange={handleCheckboxChange}
                        name="gender"
                        value="female"
                      />
                    }
                    label="Female"
                  />
                </Box>
              </FormControl>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Image Type</FormLabel>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.imageType === 'left'}
                        onChange={handleCheckboxChange}
                        name="imageType"
                        value="left"
                      />
                    }
                    label="Left"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.imageType === 'right'}
                        onChange={handleCheckboxChange}
                        name="imageType"
                        value="right"
                      />
                    }
                    label="Right"
                  />
                </Box>
              </FormControl>
              <Box marginY={2}>
                <Typography variant='title'>upload image </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'block' }}
                />
                {imagePreview && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Image Preview
                  </Typography>
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    style={{ maxWidth: '20%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </Box>
                )}
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Predict
              </Button>
              {error && (
                <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
                  Error: {error}
                </Typography>
              )}
            </form>
            <Paper elevation={1} sx={{ padding: 1, marginBottom: 2, marginTop : '1rem' }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Select an Example Image
              </Typography>
              <Grid container spacing={1} >
                {exampleData.map((example) => (
                  <Grid item xs={3} key={example.id}>
                    <Box
                      component="img"
                      src={example.imageUrl}
                      alt={example.imageType}
                      sx={{
                        width: "50px",
                        height: "auto",
                        cursor: "pointer",
                        border: "2px solid transparent",
                        "&:hover": {
                          border: "2px solid",
                          borderColor: "primary.main",
                        },
                      }}
                      onClick={() => handleImageClick(example)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
         
        </Grid>
        </Grid>

       
        <Grid container item spacing={2}>
        <Grid  item xs={12} md={3} lg={3} direction="column" sx={{width : '500px'}}>
          <Box elevation={2} >
            {
              isLoading ? (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <CircularProgress />
                  <Typography variant="body1" sx={{ marginLeft: "1rem" }}>
                    Loading prediction...
                  </Typography>
                </Paper>
              ) : prediction ? (
                <>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        marginBottom: 2,
                        fontWeight: "bold",
                        color: "red",
                        marginTop: "1rem",
                      }}
                    >
                      Prediction: {prediction}
                    </Typography>
                  </Paper>
                  <Typography variant="h6">Visualization images</Typography>
                </>
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography variant="body1" color="textSecondary">
                    No prediction yet. Please upload an image.
                  </Typography>
                </Paper>
              )
            }
          {prediction && <ProcessedImages imageUrls={imageUrls} /> }
          </Box>
        </Grid>
        </Grid>
        <Grid container item spacing={2}>
        <Grid  item xs={12} md={3} lg={3} direction="column" sx={{padding : '20px',width : '200px'}}>
        {prediction && (
            <InformationDisplay
            description={description}
            symptoms={symptoms}
            riskFactors={riskFactors}
            remedies={remedies}
            careInstructions={careInstructions}
            complicationsIfUntreated={complicationsIfUntreated}
            supportResources={supportResources}
            name={formData.name}
            age={formData.age}
            gender={formData.gender}
            imageType={formData.imageType}
            /> 
        ) }
       </Grid>
       </Grid>
      </Grid>
  );
}

export default ImageUpload;