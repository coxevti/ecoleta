import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin } from 'react-feather';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import api from 'services/api';
import {
  Container,
  Form,
  FormField,
  FormFieldGroup,
  FormFieldset,
  FormItemsGrid,
} from './styles';

interface ResponseItems {
  id: string;
  name: string;
  imageUrl: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<ResponseItems[]>([]);

  useEffect(() => {
    api.get('/items').then((response) => setItems(response.data.items));
  }, []);

  return (
    <Container>
      <header>
        <h1>Ecoleta</h1>
        <Link to="/">
          <ArrowLeft /> Voltar para home
        </Link>
      </header>
      <Form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <FormFieldset>
          <legend>
            <div>
              <h2>Dados</h2>
            </div>
          </legend>
          <FormField>
            <label htmlFor="name">
              <span>Nome</span>
              <input type="text" name="name" id="name" placeholder="Nome" />
            </label>
          </FormField>
          <FormFieldGroup>
            <FormField>
              <label htmlFor="email">
                <span>E-mail</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                />
              </label>
            </FormField>
            <FormField>
              <label htmlFor="whatsapp">
                <span>Whatsapp</span>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  placeholder="Whatsapp"
                />
              </label>
            </FormField>
          </FormFieldGroup>
        </FormFieldset>

        <FormFieldset>
          <legend>
            <div>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </div>
          </legend>
          <Map center={[-20.46971, -54.70999]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-20.46971, -54.70999]} />
          </Map>
          <FormFieldGroup>
            <FormField>
              <label htmlFor="uf">
                <span>Estado (UF)</span>
                <select name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                </select>
              </label>
            </FormField>
            <FormField>
              <label htmlFor="city">
                <span>Cidade</span>
                <select name="city" id="city">
                  <option value="0">Selecione uma cidade</option>
                </select>
              </label>
            </FormField>
          </FormFieldGroup>
        </FormFieldset>

        <FormFieldset>
          <legend>
            <div>
              <h2>Itens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </div>
          </legend>
          <FormItemsGrid>
            {items.map((item) => (
              <li key={item.id} className="selected">
                <img src={item.imageUrl} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </FormItemsGrid>
        </FormFieldset>
        <button type="submit">
          <MapPin />
          Cadastrar ponto de coleta
        </button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
