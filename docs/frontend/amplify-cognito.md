# Jak zprovoznit amplify cognito

1. git clone git@github.com:jimdixx/hackathon-2024.github

1.5 Pokud nemáte, vytvořte si identitu v ~/.aws/
    - ./config: 
        [default]
        region=eu-west-1

        [profile <profile name here>]
        region=eu-west-1
    - ./credentials: 
        [<profile name here>]
        aws_access_key_id=<access key here>
        aws_secret_access_key=<secret key here>
        
2. amplify pull --appId d2pv7sx98n5rih --envName master

3. Vybrat následující možnosti:  
- Profile: <vyber definovaný profil viz výše>
- Default Editor: <libovolně, co plánujete využít>
- Jazyk: Javascript
- Framework: react-native
- Source directory path: /
- Distribution directory path: /
- Build command: <ENTER>
- Start command: <ENTER>
- Do you plan on modifying this backend: no

4. amplify pull

