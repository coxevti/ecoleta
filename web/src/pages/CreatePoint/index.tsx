import { LeafletMouseEvent } from 'leaflet';
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ArrowLeft, MapPin } from 'react-feather';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import api from 'services/api';
import apiIBGE from 'services/apiIBGE';
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

interface ResponseIBGEUfs {
  sigla: string;
}

interface ResponseIBGECities {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const history = useHistory();
  const [items, setItems] = useState<ResponseItems[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [positionMap, setPositionMap] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
      setPositionMap([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    apiIBGE
      .get<ResponseIBGEUfs[]>('/localidades/estados')
      .then((response) => setUfs(response.data.map((uf) => uf.sigla)));
  }, []);

  useEffect(() => {
    if (selectedUF === '0') {
      return;
    }
    apiIBGE
      .get<ResponseIBGECities[]>(
        `/localidades/estados/${selectedUF}/municipios`,
      )
      .then((response) => setCities(response.data.map((city) => city.nome)));
  }, [selectedUF]);

  useEffect(() => {
    api.get('/items').then((response) => setItems(response.data.items));
  }, []);

  const handleChangeUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedUF(event.target.value);
    },
    [],
  );

  const handleChangeCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value);
    },
    [],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedItem.findIndex((item) => item === id);
      if (alreadySelected >= 0) {
        const filteredItems = selectedItem.filter((item) => item !== id);
        setSelectedItem(filteredItems);
      } else {
        setSelectedItem([...selectedItem, id]);
      }
    },
    [selectedItem],
  );

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setPositionMap([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const { name, email, whatsapp } = formData;
      const [latitude, longitude] = positionMap;
      const uf = selectedUF;
      const city = selectedCity;
      const data = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        items: selectedItem.join(','),
      };
      await api.post('/points', data);
      alert('Ponto de coleta cadastrada');
      history.push('/');
    },
    [formData, positionMap, selectedCity, selectedItem, selectedUF],
  );

  return (
    <Container>
      <header>
        <h1>Ecoleta</h1>
        <Link to="/">
          <ArrowLeft /> Voltar para home
        </Link>
      </header>
      <Form onSubmit={handleSubmit}>
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
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleInputChange}
              />
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.whatsapp}
                  onChange={handleInputChange}
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
          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={positionMap} />
          </Map>
          <FormFieldGroup>
            <FormField>
              <label htmlFor="uf">
                <span>Estado (UF)</span>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUF}
                  onChange={handleChangeUf}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </label>
            </FormField>
            <FormField>
              <label htmlFor="city">
                <span>Cidade</span>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleChangeCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
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
              <li
                key={item.id}
                className={selectedItem.includes(item.id) ? 'selected' : ''}
                onClick={() => handleSelectItem(item.id)}
                role="presentation"
              >
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
