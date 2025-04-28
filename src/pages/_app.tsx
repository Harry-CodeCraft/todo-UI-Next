/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import App from "next/app";
import { Store } from "redux";
import NotFoundPage from "./404";
import { StoreProvider } from "./StoreProvider";
import { handleLogout } from "@/app/components/dashboardContainer/utils";
import SessionTimeoutModal from "@/app/components/SessionTimeoutModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TodoApp extends App<{ pageProps: any; store: Store }> {
  state = {
    isSessionTimeoutModalOpen: false,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isSessionTimeoutModalOpen: false,
    };
    this.onActivity = this.onActivity.bind(this); // Bind the function here
  }

  componentDidMount(): void {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
      window.document.addEventListener("mousemove", this.onActivity);

      window.document.addEventListener("keypress", this.onActivity);
    }
  }

  onActivity() {
    const getTimeStamp = sessionStorage.getItem("currentTimeStamp");
    const token = sessionStorage.getItem("token");
    const expireIn = Number(sessionStorage.getItem("expireIn")) ?? 0;
    const currentTimeStamp = new Date().getTime();
    const expireInMillis = currentTimeStamp - Number(getTimeStamp);
    const expireInMin = expireIn / 60 - expireInMillis / 1000 / 60;
    if (expireInMin <= 5 && this.state.isSessionTimeoutModalOpen === false) {
      this.setState({ isSessionTimeoutModalOpen: true });
    }
    if (expireInMin < 1 && token) {
      handleLogout();
      alert("Session expired. Please login again.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static redirectToComponent = (pageProps: any, Component: any) => {
    return pageProps?.notFound ? (
      <NotFoundPage />
    ) : (
      <Component {...pageProps} />
    );
  };

  render() {
    const { Component, pageProps } = this.props;
    const { isSessionTimeoutModalOpen } = this.state;
    return (
      <>
        <StoreProvider>
          {isSessionTimeoutModalOpen && (
            <SessionTimeoutModal
              onSignOut={() => console.log("sign out")}
              onStaySignedIn={() => console.log("stay signed in")}
              isOpen={this.state.isSessionTimeoutModalOpen}
            />
          )}
          {TodoApp.redirectToComponent(pageProps, Component)}
        </StoreProvider>
      </>
    );
  }
}
export default TodoApp;
