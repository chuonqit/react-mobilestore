import styled, { createGlobalStyle } from "styled-components";

export const CssBaseLine = createGlobalStyle`
    body {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        color: #212529;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
    }
`;

export const LayoutWrapper = styled.div`
    min-height: 100vh;
`;

export const Topbar = styled.div`
    background-color: #ffffff;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    z-index: 888;
    position: fixed;
    height: 100%;
    left: 0;
    right: 0;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 995px) {
        padding-left: 48px;
    }
`;

export const Logo = styled.div`
    width: 100px;
    text-transform: uppercase;
    font-size: 30px;
    letter-spacing: 2px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    color: var(--ant-primary-color);
`;

export const UserDropdown = styled.div`
    & button span {
        line-height: 1.7;
    }
    & .ant-dropdown-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        & svg {
            width: 40px;
        }
    }
`;

export const Sidebar = styled.div`
    z-index: 999;
    height: 100vh;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 56px;
    background-color: #fff;
    & .ant-menu {
        max-height: calc(100vh - 56px);
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 2px;
        }
        &::-webkit-scrollbar-thumb {
            background: var(--ant-primary-color);
        }
        &.ant-menu-root.ant-menu-inline {
            padding-bottom: 56px;
            padding-top: 16px;
        }
    }
    & .ant-layout-sider-zero-width-trigger {
        height: 36px;
        width: 36px;
        left: 0;
        top: -47px;
        line-height: 36px;
        background-color: var(--ant-primary-color);
    }
`;

export const MenuSub = styled.div`
    & .ant-menu-item,
    & .ant-menu-submenu-title {
        padding-left: 20px !important;
    }
    & .ant-menu-submenu-title {
        margin-top: 0;
        user-select: none;
        color: rgba(0, 0, 0, 0.85);
        & .ant-menu-title-content {
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            line-height: 40px;
        }
    }
    &:hover .ant-menu-submenu-title {
        color: var(--ant-primary-color);
    }
    & .ant-menu-sub.ant-menu-inline {
        background-color: #fff;
        user-select: none;
        &.ant-motion-collapse,
        &.ant-motion-collapse-leave-active,
        &.ant-motion-collapse-leave {
            transition: none !important;
        }
    }
    &.ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
        transform: translateY(-0);
        margin-top: -5px;
    }
    & > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
        &::before,
        &::after {
            transition: none !important;
        }
    }
    &:not(.ant-menu-submenu-open).ant-menu-submenu-selected .ant-menu-submenu-arrow,
    &:not(.ant-menu-submenu-open).ant-menu-submenu-selected .ant-menu-submenu-title {
        color: var(--ant-primary-color);
    }
    & .ant-menu {
        padding-bottom: 0;
    }
    & .ant-menu-item {
        margin-top: 0;
        &:not(.ant-menu-item-selected) {
            color: rgba(0, 0, 0, 0.85);
        }
        &.ant-menu-item-selected {
            font-weight: 600;
            color: var(--ant-primary-color);
        }
        &.ant-menu-item-selected,
        &::after,
        &:active {
            background: transparent;
            border: 0;
        }
    }
`;

export const ContentWrapper = styled.div`
    min-height: 280px;
    margin-top: 56px;
    background-color: #f9f9f9;
    margin-left: 280px;
    @media (max-width: 995px) {
        margin-left: 0;
    }
`;

export const ContentContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    @media (max-width: 995px) {
        padding: 16px;
    }
`;
