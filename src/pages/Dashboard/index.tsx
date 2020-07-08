import React, { useState, FormEvent } from "react";
import api from "../../services/api";
import { Title, Form, Movies } from "./style";
import logo from "../../assets/logo.svg";

//É necessário criar uma interface pois o estado
//que criamos para guardar os filmes fica sem tipo algum 'never'
//causando conflito
interface MovieDTO {
  Title: string;
  imdbID: string;
  Year: string;
  Type: string;
  Poster: string;
}

const Dashboard: React.FC = () => {
  // 1- crio um estado para o campo de busca
  const [newMovie, setNewMovies] = useState("");
  // 2- crio um estado para o vetor que vai guardar os filmes da busca
  const [movies, setMovies] = useState<MovieDTO[]>([]); //definidino o tipo da interface criada

  async function handleAddMovies(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault(); //evitar que o formulário recarregue a página
    //chamada da api
    const response = await api.get(`?s=${newMovie}&apikey=c8111fa9`);
    //capturando o que vem da api
    const allItens = response.data.Search;
    //garantido o uso do estado copiando todo o vetor de movies e adicionando
    //o que vem da api depois
    setMovies(allItens);
  }

  return (
    <>
      <img src={logo} alt="movie explorer" />
      <Title>
        <span>Find</span> your favorite movie, series or tv shows
      </Title>

      <Form onSubmit={handleAddMovies}>
        <input
          value={newMovie}
          onChange={(e) => setNewMovies(e.target.value)}
          placeholder="Just type the name of ur favorite show"
        />
        <button>Find</button>
      </Form>

      <Movies>
        {movies.map(function (item, index) {
          return (
            <div key={item.imdbID} className="container">
              <div className="img">
                <img src={item.Poster} alt={item.Title} />
              </div>
              <h2>{item.Title}</h2>
              <div className="info">
                <p>{item.Year}</p>
                <p>{item.Type}</p>
              </div>
              <a href="teste">explore</a>
            </div>
          );
        })}
      </Movies>
    </>
  );
};

export default Dashboard;
