import React from 'react';
// import Section, {styles} from './Section';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {Reclaim} from '@reclaimprotocol/reactnative-sdk';

function App(): React.JSX.Element {
  const reclaimClient = new Reclaim.ProofRequest(''); // your app ID.
  const APP_SECRET = ''; // your app secret key.

  async function startVerificationFlow() {
    console.log('startVerificationFlow');
    const providerIds = [
      '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth (auto seleted)
    ];

    const appDeepLink = 'mychat://chat/';
    reclaimClient.setAppCallbackUrl(appDeepLink);

    reclaimClient.addContext('users address', 'add a message');

    await reclaimClient.buildProofRequest(providerIds[0]);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET as string),
    );

    console.log(
      'signature',
      await reclaimClient.generateSignature(APP_SECRET as string),
    );

    const {requestUrl, statusUrl} =
      await reclaimClient.createVerificationRequest();

    console.log('Request URL:', requestUrl);
    console.log('Status URL:', statusUrl);

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof);
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
        // Your business logic here to handle the error
      },
    });
  }
  return (
    <SafeAreaView>
      <SafeAreaView>
        <View>
          <Pressable onPress={startVerificationFlow}>
            <Text>Start Verification Flow</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default App;
