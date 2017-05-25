/** React Test Client that Loades componets for testing
/* create the main angular app module and config*/
//import in styles
import './public/styles/styles.less';
import 'bootstrap';
import React from 'react';
import ReactDom from 'react-dom'

/**  */
var PageContent = React.createClass(
  {

  render: () =>{ return <button className="btn btn-primary">Page Content Benefit! </button>
}


});
var Slider = React.createClass(
  {

  render: () =>{ return <div>Slider Goes Here! </div>
}


});
var Header = React.createClass(
  {

  render: () =>{ return <div>Header Goes here! </div>
}


});
var QuickSearch = React.createClass(
  {

  render: () =>{ return <div>QuickSearch Goes here! </div>
}


});

ReactDom.render(<PageContent> </PageContent>,document.getElementById('benefit-content'));
ReactDom.render(<Slider> </Slider>,document.getElementById('slider'));
ReactDom.render(<Header> </Header>,document.getElementById('header'));
ReactDom.render(<QuickSearch> </QuickSearch>,document.getElementById('quick-search'));

//import in images
//import bootstrap and font awesome


//load movie app resources



//load movie app resources
