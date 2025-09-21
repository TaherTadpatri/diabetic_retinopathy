import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function InformationDisplay({
  description,
  symptoms,
  riskFactors,
  remedies,
  careInstructions,
  complicationsIfUntreated,
  supportResources,
  name,
  age,
  gender,
  imageType,
}) {
  return (
    <Box sx={{ marginTop: 2 ,width : "500px"}}>
      {/* Patient Information */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Patient Information
        </Typography>
        <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
        <Typography variant="body1"><strong>Age:</strong> {age}</Typography>
        <Typography variant="body1"><strong>Gender:</strong> {gender}</Typography>
        <Typography variant="body1"><strong>Image Type:</strong> {imageType}</Typography>
      </Box>
      <Divider sx={{ marginY: 2 }} />

      {/* Processed Images */}

      {/* Description */}
      {description && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Description
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      )}

      {/* Symptoms */}
      {symptoms && symptoms.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Symptoms
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {symptoms.map((symptom, index) => (
                <ListItem key={index}>
                  <ListItemText primary={symptom} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Risk Factors */}
      {riskFactors && riskFactors.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Risk Factors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {riskFactors.map((factor, index) => (
                <ListItem key={index}>
                  <ListItemText primary={factor} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Remedies */}
      {remedies && remedies.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Remedies
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {remedies.map((remedy, index) => (
                <ListItem key={index}>
                  <ListItemText primary={remedy} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Care Instructions */}
      {careInstructions && careInstructions.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Care Instructions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {careInstructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Complications if Untreated */}
      {complicationsIfUntreated && complicationsIfUntreated.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Complications if Untreated
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {complicationsIfUntreated.map((complication, index) => (
                <ListItem key={index}>
                  <ListItemText primary={complication} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Support Resources */}
      {supportResources && supportResources.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Support Resources
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {supportResources.map((resource, index) => (
                <ListItem key={index}>
                  <ListItemText primary={resource} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

export default InformationDisplay;