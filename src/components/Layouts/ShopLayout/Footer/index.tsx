import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

const Footer = () => {
    return (
        <footer>
            <div className="ms-footer">
                <div className="ms-wrapper">
                    <div className="ms-footer__row">
                        <div className="ms-footer__col">
                            <ul className="ms-footer__mnul">
                                <li>
                                    <Link to="">Giới thiệu về công ty</Link>
                                </li>
                                <li>
                                    <Link to="">Câu hỏi thường gặp mua hàng</Link>
                                </li>
                                <li>
                                    <Link to="">Chính sách bảo mật</Link>
                                </li>
                                <li>
                                    <Link to="">Quy chế hoạt động</Link>
                                </li>
                                <li>
                                    <Link to="">Kiểm tra hóa đơn điện tử</Link>
                                </li>
                                <li>
                                    <Link to="">Tra cứu thông tin bảo hành</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="ms-footer__col">
                            <ul className="ms-footer__mnul">
                                <li>
                                    <Link to="">Tin tuyển dụng</Link>
                                </li>
                                <li>
                                    <Link to="">Tin khuyến mãi</Link>
                                </li>
                                <li>
                                    <Link to="">Hướng dẫn mua online</Link>
                                </li>
                                <li>
                                    <Link to="">Hướng dẫn mua trả góp</Link>
                                </li>
                                <li>
                                    <Link to="">Chính sách trả góp</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="ms-footer__col">
                            <ul className="ms-footer__mnul">
                                <li>
                                    <Link to="">Hệ thống cửa hàng</Link>
                                </li>
                                <li>
                                    <Link to="">Hệ thống bảo hành</Link>
                                </li>
                                <li>
                                    <Link to="">Bán hàng doanh nghiệp</Link>
                                </li>
                                <li>
                                    <Link to="">Giới thiệu máy đổi trả</Link>
                                </li>
                                <li>
                                    <Link to="">Chính sách đổi trả</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="ms-footer__col ms-footer__col2">
                            <ul className="ms-footer__col-top">
                                <li>
                                    <p>Tư vấn mua hàng (Miễn phí)</p>
                                    <a href="tel:123456789" title="">
                                        123456789
                                    </a>
                                    <span>(Nhánh 1)</span>
                                    <p>Hỗ trợ kỹ thuật</p>
                                    <a href="tel:123456789" title="">
                                        123456789
                                    </a>
                                    <span>(Nhánh 2)</span>
                                </li>
                                <li>
                                    <p>Góp ý, khiếu nại dịch vụ (8h00-22h00)</p>
                                    <a href="tel:123456789" title="">
                                        123456789
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-footer__bottom">
                <div className="ms-wrapper">© 2022 - Kiều Văn Chương</div>
            </div>
        </footer>
    );
};

export default Footer;
