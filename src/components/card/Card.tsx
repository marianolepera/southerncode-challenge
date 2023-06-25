// "use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { boxDirectionStyle, boxExpandStyle, boxStyle, cardStyle, chipStyle, dateStyle, iconStyle, insideBoxStyle, statusStyle, typoNameStyle, typographyStyle } from './styles';
import MarsRover from '@/interfaces/interfaces';
import { FC } from 'react';
import Divider from '@mui/material/Divider';
import { Box, Chip, Collapse, Stack } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

interface CardNasaProps {
  mars: MarsRover
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardNasa: FC<CardNasaProps> = ({ mars }: CardNasaProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardMediaStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center center",
    backgroundSize: "100% 100%",
    height: 220,
    backgroundImage: `url("${mars?.img_src}")`,
  }

  return (
    <Card sx={cardStyle}>
      <CardMedia
        sx={cardMediaStyle}
        component="img"
      />
      <CardContent>
        <Typography sx={typoNameStyle} gutterBottom variant="h5" component="div" >
          {mars?.rover?.name}
        </Typography>
        <Typography sx={statusStyle} gutterBottom component="div">
          {mars?.camera?.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {mars?.camera?.full_name}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardContent>
        <Typography sx={statusStyle} gutterBottom component="div">
          Status
        </Typography>
        <Box sx={boxExpandStyle}>
          <Stack direction="row" spacing={1}>
            <Chip label={mars?.rover?.status} sx={chipStyle} variant="outlined" />
          </Stack>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
        <CardContent>
          <Box sx={boxStyle}>
            <RocketLaunchIcon sx={iconStyle} color="primary" />
            <Box sx={insideBoxStyle}>
              <Box sx={boxDirectionStyle}>
                <Typography sx={typographyStyle}> earth: </Typography>
                <Typography sx={dateStyle}> {mars?.earth_date}</Typography>
              </Box>
              <Box sx={boxDirectionStyle}>
                <Typography sx={typographyStyle}> sol:  </Typography>
                <Typography sx={dateStyle}>{mars?.sol}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CardNasa
