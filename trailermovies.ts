import { Request, Response } from 'express';

const express = require('express');
const app = express();

// Or Id
app.get('/trailers/:movietrailerLink', async (req, res) => {
    const movietrailerLink = req.params.movietrailerLink;
    const imdbApiUrl = `https://www.imdb.com/title/tt9218128/?ref_=nv_sr_srsg_1_tt_6_nm_1_in_0_q_Gladia/${movietrailerLink}`;
    const imdbApiUrl1 = `https://www.imdb.com/title/tt15239678/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_Dune%2520/${movietrailerLink}`;
    const imdbApiUrl2 = `https://www.imdb.com/title/tt6263850/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_Deadpol/${movietrailerLink}`;
    const imdbApiUrl3 = `https://www.imdb.com/title/tt11315808/?ref_=nv_sr_srsg_2_tt_6_nm_0_in_0_q_Joker/${movietrailerLink}`;
    //https://imdb-api.com/en/API/Trailer/${movieId}`;
    try {
      //const trailerResponse = await axios.get(imdbApiUrl);
      const trailerUrl = trailerResponse.data.trailer.url;
      const videoMetadata = await getVideoMetadata(trailerUrl);
  
      res.json(videoMetadata);
      res.status(200).send({ message: 'Trailers with sucess' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Is not found the links trailers' });
    }

  });
  
  async function getVideoMetadata(trailerUrl) {
    // Implement video metadata parsing logic here
    // Return an object with title, duration, and other relevant metadata
  }

app.listen(3000)