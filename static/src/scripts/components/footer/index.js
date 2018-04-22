import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollToTopIsShowen : false
        };
        this.showScrollToTop = this.showScrollToTop.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.showScrollToTop);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.showScrollToTop);
    }
    showScrollToTop(){
        if ( window.scrollY > 250 ){
            this.setState({
                'scrollToTopIsShowen': true
            });
        } else {
            this.setState({
                'scrollToTopIsShowen': false
            });
        }
    }
    scrollToTop(){
        (function smoothscroll(){
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        })();
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">                       
                            <footer className="shop_footer">
                            footer
                                <div className={'scrollToTop ' + (this.state.scrollToTopIsShowen === true ? 'active' : '')} 
                                    onClick={this.scrollToTop}>zzz</div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;

