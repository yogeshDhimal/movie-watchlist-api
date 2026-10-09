

import { AppDataSource } from "../../config/data-source.js";
import { Movie } from "../../entities/Movie.js";

const movieRepository = AppDataSource.getRepository(Movie);



