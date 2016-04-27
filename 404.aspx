<%@ Page Language="C#" AutoEventWireup="true" CodeFile="404.aspx.cs" Inherits="_404" %>
<!DOCTYPE html>
<html lang="pt-br">
<head>

    <title>Stilo Motos - Página não encontrada</title>
    <meta http-equiv="cleartype" content="on">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta http-equiv="x-rim-auto-match" content="none">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <style>

        * {
            line-height: 1.5;
            margin: 0;
        }

        html {
            color: #888;
            font-family: sans-serif;
            text-align: center;
        }

        body {
            left: 50%;
            margin: -130px 0 0 -168px;
            position: absolute;
            top: 50%;
            width: 336px;
        }

        h1 {
            color: #555;
            font-size: 2em;
            font-weight: 400;
        }

        p {
            line-height: 1.2;
        }
        button{
            margin-top:2em;
        }

        @media only screen and (max-width: 400px) {

            body {
                margin: 10px auto;
                position: static;
                width: 95%;
            }
            h1 {
                font-size: 1.5em;
            }
        }

    </style>

</head>
<body>
    <h1>Página não encontrada</h1>
    <p>Desculpe, mas a página que você esta tentando acessar não existe.</p>
    <button type="button" onclick="javascript:window.location = '/' ">Voltar</button>
</body>
</html>
