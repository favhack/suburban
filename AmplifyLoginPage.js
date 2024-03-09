const AimplifyLoginPage = ({ navigation }) => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default AimplifyLoginPage;
