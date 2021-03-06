# Localization API

A API provê a funcionalidade:
**de buscar a geolocalização de endereços e calcular as distâncias entre os mesmos.**

- [Localization API](#localization-api)
  - [Installation:](#installation)
  - [API Rest:](#api-rest)
    - [Endpoints:](#endpoints)
  - [Requests](#requests)
    - [Localization](#localization)

## Installation:
Para que a API seja instalada e utilizada, é necessário que o NodeJS 14 seja instalado. Após esse passo é necessário instalar as dependências do projeto (npm install) e rodar o comando npm start. Também é necessário que uma variável de ambiente chamada GOOGLE_API_KEY seja criada (com o valor da API_KEY da sua conta de desenvolvedor do google) para que a API possa buscar as geolocalizações dos endereços no google. Segue um link para o setup da sua conta de desenvolvedor no google: https://developers.google.com/maps/documentation/geocoding/cloud-setup

## API Rest:
### Endpoints:
| URL                                    |
| -------------------------------------- |
| http://localhost:3000/localizations |

## Requests
### Localization

`POST`[`${HOST}`](#end-points)`/localizations`

-   Exemplo de requisição:

    ```json
    [
        "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003",
        "Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200",
        "Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030"
    ]
    ```

-   Exemplos de respostas:

    -   Distâncias calculadas com sucesso: `200`
        ```json
        {
            "statusCode": 200,
            "body": [
                {
                    "address": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
                    "orderedDistanceList": [
                        {
                            "distanceBetween": 0.011921952761606592,
                            "to": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil"
                        },
                        {
                            "distanceBetween": 0.05386960931583117,
                            "to": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil"
                        }
                    ]
                },
                {
                    "address": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
                    "orderedDistanceList": [
                        {
                            "distanceBetween": 0.011921952761606592,
                            "to": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil"
                        },
                        {
                            "distanceBetween": 0.04985377389897498,
                            "to": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil"
                        }
                    ]
                },
                {
                    "address": "R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil",
                    "orderedDistanceList": [
                        {
                            "distanceBetween": 0.04985377389897498,
                            "to": "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil"
                        },
                        {
                            "distanceBetween": 0.05386960931583117,
                            "to": "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil"
                        }
                    ]
                }
            ]
        }
        ```

    -   Erros de validação no request: `400 Bad request`

        ```
            O request precisa ter dois ou mais endereços
        ```
        ```
            O request precisa ser uma lista
        ```
        ```
            Endereço inválido, pois o valor está vazio
        ```
