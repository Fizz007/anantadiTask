import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";

import { baseUrl } from "./Utils/baseUrl";

function App() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/videos`);
      setVideos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {
    try {
      const newVideo = {
        title,
        description,
        videoUrl,
      };

      const response = await axios.post(
        `${baseUrl}/videos`,
        newVideo
      );
      console.log(response.data);

      setTitle("");
      setDescription("");
      setVideoUrl("");

      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (videoId) => {
    try {
      await axios.delete(`${baseUrl}/videos/${videoId}`);
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>   
      <Grid container spacing={2} mt="15px">
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Paste the video URL"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={10}>
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
        </Grid>
        {videos.map((item, i) => (
          <Grid item xs={12} md={6} lg={4} key={i}>
            <div>
              <video
                src={item.videoUrl}
                controls
                style={{ width: "100%" }}
              ></video>
              <Typography variant="h6" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Button
                variant="contained"           
                color="error"                
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
