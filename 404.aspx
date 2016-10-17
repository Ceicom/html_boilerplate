<%@ Page Language="C#" AutoEventWireup="true" CodeFile="404.aspx.cs" Inherits="_404" %>
<!DOCTYPE html>
<html lang="pt-br" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>

    <title>Página não encontrada</title>
    <meta http-equiv="content-language" content="pt-br">
    <meta charset="utf-8" />
    <meta name="robots" content="none" />
    <meta name="google" content="notranslate" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">

    <style>

        * {
            line-height: 1.5;
        }

        html {
            background-color: #fff;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
            overflow: hidden;
        }

        div {
            padding-top: 20vh;
            max-width: 600px;
            margin: 0 auto;
        }

        span{
            display: table;
            margin: 0 auto 30px auto;
            border-radius: 3px;
            background-color: #fff;
            color: #666;
            text-transform: uppercase;
            padding: 4px 8px;
            font-size: 14px;
            font-weight: 700;
            border: 1px solid #999;
        }

        h1 {
            font-size: 3em;
            font-weight: 900;
            line-height: 1em;
        }

        p{
            line-height: .6em;
            font-family: Georgia;
        }

        a{
            margin-top: 2em;
            border: 2px solid #999;
            background-color: transparent;
            color: #666;
            padding: 5px 50px;
            border-radius: 5px;
            cursor: pointer;
            text-transform: uppercase;
            display: inline-block;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
        }

    </style>

</head>
<body>

    <div class="center">

        <span>Erro 404</span>
        <h1>Página não encontrada...</h1>
        <p>Desculpe, mas a página que você <br />esta tentando acessar não existe.</p>
        <a href="javascript:history.back(-1);" role="button">Voltar</a>

    </div>

</body>
</html>