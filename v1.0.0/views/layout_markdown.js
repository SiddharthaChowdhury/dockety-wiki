<!DOCTYPE html>
<html>
  <head>
    <title><%=typeof title == 'undefined' ? 'Markdown' : title%></title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!--STYLES-->
    <link rel="stylesheet" href="/styles/bootstrap.min.css">
    <link rel="stylesheet" href="/styles/styles.css">
    <!--STYLES END-->
  </head>

  <body>
    <%- body %>

    <!--SCRIPTS-->
    <script src="/js/dependencies/sails.io.js"></script>
    <script src="/js/dependencies/jquery-3.1.1.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/context_menu.min.js"></script>
    <!-- <script src="/js/jquery.validate.min.js"></script> -->
    <script src="/js/showdown.min.js"></script>
    <script src="/js/script.js"></script>
    <!--SCRIPTS END-->
  </body>
</html>
