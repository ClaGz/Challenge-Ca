# Localization API

A API provê a funcionalidade:
**de buscar a geolocalização de endereços e calcular as distâncias entre os mesmos.**

- [Localization API](#localization-api)
  - [Installation:](#installation)
  - [API Rest:](#api-rest)
    - [End-points:](#end-points)
  - [Requests](#requests)
    - [Localization](#localization)

## Installation:
Para que a API seja instalada e utilizada basta executar o installAndRun.sh existente na raiz do projeto. Também é necessário que um valor de GOOGLE_API_KEY seja fornecido para que a API possa buscar as geolocalizações dos endereços no google. Portanto o deve-se executar:
```
./installAndRun.sh --GOOGLE_API_KEY=${sua_chave_da_api_do_google}
```
Link para o setup da sua conta de desenvolvedor no google: https://developers.google.com/maps/documentation/geocoding/cloud-setup
## API Rest:
### End-points:
| URL                                    |
| -------------------------------------- |
| http://localhost:3000/localizations |

## Requests
### Localization

`POST`[`${HOST}`](#end-points)`/localizations`\

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