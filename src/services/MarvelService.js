class MarvelService {
	// начальное название API
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	// мой ключ
	_apiKey = 'apikey=129b3670ad033d82bbeb6ea2a1095d5c';
	//базовый отступ 
	_baseOffset = 650;

	// будет отвечать за получение данных
	getResource = async (url) => {
	// нам нужно передать url запроса
		const res = await fetch(url);

	// выбрасываем ошибку, если что-то пошло не так
		if (!res.ok) {
			throw new Error(`Could not featch ${url}, status: ${res.status}`);
		}

	// возвращаем Promise с json-формате
		return await res.json();
	}

	// получение всех персонажей
	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	// получение одного персонжа
	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

  // трансформация персонажа
  _transformCharacter = (char) => {	
		return {
						id: char.id,
						name: char.name,
						description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
						thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
						homepage: char.urls[0].url,
						wiki: char.urls[1].url,
						comics: char.comics.items,
		}
  }
}

export default MarvelService;


