/**
 * Route Mappings
 */

module.exports.routes = {

  
  // ========== STATIC LINKS =============================
  '/': function(req, res){return res.view('homepage')},
  '/login': function(req, res){ if(req.session.isAuthPassed) return res.redirect('/dashboard'); return res.view('static/sign', {layout: 'layout_happypath', title: 'Sign in'})},
  '/signup': function(req, res){ if(req.session.isAuthPassed) return res.redirect('/dashboard'); return res.view('static/sign', {layout: 'layout_happypath', title: 'Sign up'})},
  '/forgot-password': function(req, res){ if(req.session.isAuthPassed) return res.redirect('/dashboard'); return res.view('static/sign', {layout: 'layout_happypath', title: 'Forgot password'})},
  

  // ========== REQUESTS =============================
  'post /create/user' : 'UserController.createUser',
  'post /login/user': 'UserController.loginUser',


  '/documents': 'DocumentController.view',
  '/markdown': 'DocumentController.markdownPage',
  '/wysiwyg': 'DocumentController.wysiwygPage',
  '/dashboard': 'UserController.getDashboardView',

  '/learn/markdown': function(req, res){ return res.view('static/markdown_guide')},
  'post /rest/get-tree': 'DocumentController.view', // ASYNC
  'post /rest/save-doc' : 'DocumentController.createNew'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
