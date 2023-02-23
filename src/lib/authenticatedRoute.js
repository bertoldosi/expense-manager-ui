const redirectForLogin = (res) => {
  res.writeHead(302, {
    Location: "/login",
  });

  res.end();
  return { props: {} };
};

export const withAuth = (callback) => {
  return async (context) => {
    const { req, res } = context;

    const { user } = JSON.parse(req.cookies["expense-manager"] || "{}");

    if (user?.email) {
      return await callback(context);
    } else {
      return redirectForLogin(res);
    }
  };
};
