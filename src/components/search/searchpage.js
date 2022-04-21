import React, { Fragment, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Breadcrumb from '../common/breadcrumb';
import one from "../../assets/images/blog/blog.jpg";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

const images = [
    require('../../assets/images/big-lightgallry/013.jpg'),
    require('../../assets/images/big-lightgallry/015.jpg'),
    require('../../assets/images/big-lightgallry/014.jpg'),
    require('../../assets/images/big-lightgallry/016.jpg'),
    require('../../assets/images/big-lightgallry/01.jpg'),
    require('../../assets/images/big-lightgallry/04.jpg'),
    require('../../assets/images/big-lightgallry/05.jpg'),
    require('../../assets/images/big-lightgallry/06.jpg'),
    require('../../assets/images/big-lightgallry/07.jpg'),
    require('../../assets/images/big-lightgallry/08.jpg'),
    require('../../assets/images/big-lightgallry/07.jpg'),
    require('../../assets/images/big-lightgallry/08.jpg'),
];

const smallImages = [
    require('../../assets/images/lightgallry/013.jpg'),
    require('../../assets/images/lightgallry/015.jpg'),
    require('../../assets/images/lightgallry/014.jpg'),
    require('../../assets/images/lightgallry/016.jpg'),
    require('../../assets/images/lightgallry/01.jpg'),
    require('../../assets/images/lightgallry/04.jpg'),
    require('../../assets/images/lightgallry/05.jpg'),
    require('../../assets/images/lightgallry/06.jpg'),
    require('../../assets/images/lightgallry/07.jpg'),
    require('../../assets/images/lightgallry/08.jpg'),
    require('../../assets/images/lightgallry/07.jpg'),
    require('../../assets/images/lightgallry/08.jpg'),
];

const Searchpage = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggleGallery = () => {
        setPhotoIndex(1);
        setIsOpen(true);
    }
    return (
        <Fragment>
            <Breadcrumb title="Search Page" parent="Search Page" />
            <div className="container-fluid search-page">
                <div className="card">
                    <div className="card-header">
                        <div className="search-form">
                            <div className="form-group m-0">
                                <label className="sr-only">Email</label>
                                <input className="form-control" type="search" placeholder="Search.." />
                            </div>
                        </div>
                    </div>
                    <div className="card-body product-page-main">
                        <Nav tabs className="borderb-tab-primary">
                            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                    <i className="icon-target"></i>All
                                        </NavLink>
                            </NavItem>
                            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                    <i className="icon-image"></i>Images
                                        </NavLink>
                            </NavItem>
                            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                <NavLink className={activeTab == '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                    <i className="icon-video-clapper"></i>Videos
                                        </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                {/* {this.state.activeTab === 1 ? */}
                                <div className="row">
                                    <div className="col-xl-6">
                                        <p className="pb-4">About 6,000 results (0.60 seconds)</p>
                                        <div className="info-block">
                                            <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h6><a href="">endlesseducation.info/</a>
                                            <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                            <div className="star-ratings">
                                                <ul className="search-info">
                                                    <li>2.5 stars</li>
                                                    <li>590 votes</li>
                                                    <li>Music</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <h6>Proin eleifend metus vel erat faucibus, ut bibendum nulla iaculis.</h6><a href="">endlesseducation.info/</a>
                                            <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                            <div className="star-ratings">
                                                <ul className="search-info">
                                                    <li>2.5 stars</li>
                                                    <li>590 votes</li>
                                                    <li>Music</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <h6>Fusce rutrum elit aliquet nisi malesuada cursus.</h6><a href="">endlesseducation.info/</a>
                                            <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                            <div className="star-ratings">
                                                <ul className="search-info">
                                                    <li><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rate-blank"></i><i className="icofont icofont-ui-rate-blank"></i></li>
                                                    <li>2.5 stars</li>
                                                    <li>590 votes</li>
                                                    <li>Music</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <h6>Morbi feugiat mauris vel semper fringilla.</h6><a href="">endlesseducation.info/</a>
                                            <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                            <div className="star-ratings">
                                                <ul className="search-info">
                                                    <li><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rate-blank"></i><i className="icofont icofont-ui-rate-blank"></i></li>
                                                    <li>2.5 stars</li>
                                                    <li>590 votes</li>
                                                    <li>Music</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <h6>Morbi feugiat mauris vel semper fringilla.</h6><a href="">endlesseducation.info/</a>
                                            <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                            <div className="star-ratings">
                                                <ul className="search-info">
                                                    <li><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rating"></i><i className="icofont icofont-ui-rate-blank"></i><i className="icofont icofont-ui-rate-blank"></i></li>
                                                    <li>2.5 stars</li>
                                                    <li>590 votes</li>
                                                    <li>Music</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <Pagination aria-label="Page navigation" className="pagination pagination-primary">
                                                <PaginationItem disabled>
                                                    <PaginationLink href="#javascript">
                                                        Previous
                                                            </PaginationLink>
                                                </PaginationItem>

                                                <PaginationItem>
                                                    <PaginationLink href="#javascript">
                                                        1
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem active>
                                                    <PaginationLink href="#javascript">
                                                        2
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink href="#javascript">
                                                        3
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink last href="#javascript" >
                                                        Next
                                                            </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card lg-mt mb-0">
                                            <div className="blog-box blog-shadow"><img className="img-fluid" src={one} alt="" />
                                                <div className="blog-details">
                                                    <p className="digits">25 July 2018</p>
                                                    <h4>Accusamus et iusto odio dignissimos ducimus qui blanditiis.</h4>
                                                    <ul className="blog-social digits">
                                                        <li><i className="icofont icofont-user"></i>Mark Jecno</li>
                                                        <li><i className="icofont icofont-thumbs-up"></i>02 Hits</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* : null} */}
                            </TabPane>
                            <TabPane tabId="2">
                                {/* {this.state.activeTab === 2 ? */}
                                <div className="my-gallery row gallery-with-description">
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[0]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 0, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[1]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={toggleGallery}
                                        // onClick={() =>
                                        //     this.setState({ photoIndex: 1, isOpen: true })
                                        // }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[2]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 2, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[3]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 3, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[4]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 4, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[5]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 5, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[6]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 6, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[7]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 7, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[8]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 8, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[9]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 9, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[10]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 10, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <img
                                            src={smallImages[11]}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                this.setState({ photoIndex: 11, isOpen: true })
                                            }
                                        />
                                        <div className="caption">
                                            <h4>Portfolio Title</h4>
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                        </div>
                                    </figure>
                                </div>
                                {/* : null} */}
                            </TabPane>
                            <TabPane tabId="3">
                                {/* {this.state.activeTab === 3 ? */}
                                <div className="row">
                                    <div className="col-xl-6">
                                        <p className="pb-4">About 6,000 results (0.60 seconds)</p>
                                        <div className="media info-block">
                                            <iframe className="mr-3 mb-3" width="200" height="100" src="https://www.youtube.com/embed/CJnfAXlBRTE"></iframe>
                                            <div className="media-body">
                                                <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h6><a href="">endlesseducation.info/</a>
                                                <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                                <div className="star-ratings">
                                                    <ul className="search-info">
                                                        <li>2.5 stars</li>
                                                        <li>590 votes</li>
                                                        <li>Music</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="media info-block">
                                            <iframe className="mr-3 mb-3" width="200" height="100" src="https://www.youtube.com/embed/-L4gEk7cOfk"></iframe>
                                            <div className="media-body">
                                                <h6>Morbi eget quam et purus commodo dapibus.</h6><a href="">endlesseducation.info/</a>
                                                <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                                <div className="star-ratings">
                                                    <ul className="search-info">
                                                        <li>2.5 stars</li>
                                                        <li>590 votes</li>
                                                        <li>Music</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="media info-block">
                                            <iframe className="mr-3 mb-3" width="200" height="100" src="https://www.youtube.com/embed/FZzWGr3ruVw"></iframe>
                                            <div className="media-body">
                                                <h6>Etiam eget ligula at ante eleifend rutrum.</h6><a href="">endlesseducation.info/</a>
                                                <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                                <div className="star-ratings">
                                                    <ul className="search-info">
                                                        <li>2.5 stars</li>
                                                        <li>590 votes</li>
                                                        <li>Music</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="media info-block">
                                            <iframe className="mr-3 mb-3" width="200" height="100" src="https://www.youtube.com/embed/wpmHZspl4EM"></iframe>
                                            <div className="media-body">
                                                <h6>Lorem Ipsum is simply dummy text of the printing.</h6><a href="">endlesseducation.info/</a>
                                                <p>endless introduces a IELTS Coaching, TOEFL Coaching, GRE Coaching, GMAT Coaching, SAT Coaching in Surat.</p>
                                                <div className="star-ratings">
                                                    <ul className="search-info">
                                                        <li>2.5 stars</li>
                                                        <li>590 votes</li>
                                                        <li>Music</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <Pagination aria-label="Page navigation" className="pagination pagination-primary">
                                                <PaginationItem disabled>
                                                    <PaginationLink href="#javascript">
                                                        Previous
                                                            </PaginationLink>
                                                </PaginationItem>

                                                <PaginationItem>
                                                    <PaginationLink href="#javascript">
                                                        1
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem active>
                                                    <PaginationLink href="#javascript">
                                                        2
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink href="#javascript">
                                                        3
                                                            </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink last href="#javascript" >
                                                        Next
                                                            </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div id="video-links">
                                            <div className="embed-responsive embed-responsive-21by9 lg-mt">
                                                <iframe width="560" height="315" src="https://www.youtube.com/embed/wpmHZspl4EM" allowFullScreen=""></iframe>
                                            </div>
                                            <div className="embed-responsive embed-responsive-21by9">
                                                <iframe width="560" height="315" src="https://www.youtube.com/embed/I0-vBdh4sZ8" allowFullScreen=""></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* : null} */}
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    imageTitle={photoIndex + 1 + "/" + images.length}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % images.length
                        })
                    }
                />
            )}
        </Fragment>
    );
    // }
};

export default Searchpage;