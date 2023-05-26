const redirectLogin = (res) => {
  res.writeHead(302, {
    Location: "/login",
  });

  res.end();
  return { props: {} };
};

export const withAuth = (callback) => {
  return async (context) => {
    const { req, res } = context;

    const cookieValues = JSON.parse(req.cookies["expense-manager"] || "{}");

    const isLoggedIn = !!cookieValues?.user?.email;
    const isExpenseSelected = !!cookieValues?.filter?.expense;

    if (isLoggedIn & isExpenseSelected) {
      return await callback(context);
    }

    return redirectLogin(res);
  };
};
