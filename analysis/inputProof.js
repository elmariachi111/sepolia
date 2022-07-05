const dotenv = require('dotenv');
dotenv.config();

const { SecureTrie } = require('merkle-patricia-tree');
const { toBuffer, bufferToHex, keccak256, rlp, Account, Address } = require('ethereumjs-util');
const Web3 = require("web3");

//proofs vitalik's balance on a light node.

const web3 = new Web3("http://127.0.0.1:8545");

async function verifyAccount(address, accountProof, stateRoot) {

  const proofBufs = accountProof.map(p => toBuffer(p));
  const proofTrie = await SecureTrie.fromProof(proofBufs);
  const accNodeRaw = await proofTrie.get(keccak256(toBuffer(address)));
  const account = Account.fromRlpSerializedAccount(accNodeRaw);

  console.log("proven value", account);

  const valid = bufferToHex(proofTrie.root) == stateRoot;

  console.log("valid", valid);

}

//generated by a full node.
//mainnet vB 
const proof = {
  "accountProof": [
    "0xf90211a09a87320bedef46cc8c5501f6e695091670b4cebf6bbba0b3589659849ada0633a0bb4d5bd6649fe1b3bcb34c7a1c1c63033a2643b7292f0558b14a83d9781abc92a076969ad2b9f8628058c1e08d67900a1ab6cb405c5c5ee56297ecd8239b2887cfa0c4870223e70d0d8e0d22f6daccb44a136cd0e85b6e18e5a6aeeefbb485b488d3a0683b4b17e1feca13a9012ed781b2adf6ea52c85271d07c4bec41ddadba43e5daa07cb210c5de9f857598029c3f2f8d0af64185912e3c4dc8a759378203fbf5410ca01f990f92a6c3534d5aaa3fc483acc1bf6805ca8fe7be4d3de6a78ce6ce9e0ab2a0bfd9a09b39aa731fc041730feacf371cab698fd943c08581d675ec0885b0bb96a09af49188b99836771fc2f2cb42590a9451d1b1dcec159f3c688c9446ca921a34a00970e0fe2e8dd5ee45d56adffbf9c242d8b9af3d2b6ae5eef70b80c738c09820a0a46eaae79864192961944e055c7f5083284ea26122c0c94a142b5b4cec8aae52a0c1445bd9f6784833a9a8bf31e46851b1dd1c5e3377126725cacc33c59d015239a0b06309d0a24c5f88ca2c18e00d9733f96a0f5acfc40d0c7b456575f29b3c235ca04ee7e1a76758120dffbce3130387260af06af19d897474663effa17720cc7a0aa0a5e67a855253dcda8718316164e3c664f6c53d8e4bc2e3292b807e37a82cb10ba0ab342d45e98e0bc303a0263445b1c5908ab3f20bbe84a85944eff1511829986780",
    "0xf90211a0fcacdf88cdca92d1f2bdb11e77cfa6c763582b70a64be5595f1d0f1e905e235fa095be1a7b645f9e4dd33b1bfdf402030644299718f7a8847d6aadffbea95c8f97a0a1529a52a3c97a70b48bde2a36bcf3f164f4e23e57f47517687ebfa5d035279ba00c49712ee761ee0266101b479d2608202100b1c55a9d3085b1b3bee266ccaf42a08a0e4b25677a67d6605573ee78ffb14738ec3ad4c8b245a4656642bb924f46efa09296629bf44cddd9eef9e6aa483715fe8e8550f80d20c953ac79fc59582968d6a02d59c2a59384df903cdf6371bea54d80a09a01641791b2c9186e145184c41ffba03549c4d2703fb967cf54edb049b914f356acd26eec50d89b43c86a5c4f90b07ea0aa18bde1c2a7760e9dbdbfd422754d70c65be86e6e88e348303ed537459dee3fa0d785e32c8363ec01763cc3adea1ac2cae2798b72563c2ae060c03fcd8b860bf6a0e847695d7fecbc0e8924ec45c558fd098ed8addf8d4dee92a14689090027a4afa0f8089fb55d02f2e011ed614c84bb0a203c546a5ee8ab2f982b1cc1664f21e75da09c53a16a669921e36d59249bd1f5711ffa4f7a98e5ef7c2854249b90636d70f1a0c2755531b2be8fa475f6b6e321256fd5c1e1c09cfd9b1e0f4444d463e373de07a07e65a0445337e61d9983feefc36992a4346b5ac81c620eb8b8647daea0326c92a0acc7f0aceaea0a2795f0ce715739ec0c28fd85fdf92932a16ad802b1ba1e2f6680",
    "0xf90211a00cdd655878f298fbc0ed94cf22cf7854e9e70437ddf2762ba7e410817fe12c56a0a3d1e232755f160eb7108c82a2352b91c9a53756fac59c2131dfe97b384df25ca056f308f040e04239cf9557f3a7b1c6238e7aa38bd72e404c8b0f47ed6a4cea76a0e15996b27ceac0d00a435046aadc62359754385d2cdc70684906504717e634d9a03f1d50f19518fd45362108a357ce16306a868b6f5738653f74b7676514eb68e6a02741e568dd1bbd55e6d118db9c0559d628a47b5c8268adb7092019211a6a0c52a07c67ace592c46395df80e1ff6c0f0b31b58bba3ffa350997bb446f6b51aaf536a0391842c483f88c9c0672f14bca92b5379e5d05a87abf04c7615767b9090e49c8a042214a0a038a899984b1d8ad038e423557605b512884b8610ad7ca499609deffa0939725279413cb042d7efcd50aec6c1c5e02d27dc7a541396ed5c73b629671fca03e5e669b3e26c9280724b7dfcef92f6072fc7a3fb0c13cbe62e354a5e3a82fd7a0d7d3b02b5fd48d77cb568c682466eb90a9c98b7435c7a1f122011681d850256ba0f3f38b70c3922e6e45432278674d3c274f36841766613761bbaa1a8e0b77ca35a0d177a1c5a265fa273806b03e4ac0be83e26ce2f60757f3eec125e0fc4de6420ca01b77462dae0799298b09e99bc9003a872ea415510f694b360ea8af734f5021a1a07642b6e5da8a13f864291e8f97df4e775158bfdd11f34bbcde672ee3e2dbb42c80",
    "0xf90211a062283b1bb3cea9dc457ef11c127b99ba8efd71b49ee41985c38b08bbc2f1e472a0c42e494bcb845398eb2cb0b606306e0d46feedff07bfb893b89594385d895dcca07591e193e193c86b7abecaf9f57b8f5e3c6148a8dfb0ad9b8c906ecdd6f26119a09683aaaa7f749def167f46ee52c1e9457dba4718699aac05eef6826ed1251a2ca06178259a4d8947e1a708b2112b1248a6f31d20b26ce3b672a19e10017f20e2b8a0a5c72150c99c9000265b6e7b0dd1213a7cc22d7b97718d8ceda23053d27b568ba03fb94f2acc071fb169685838eab67af1c666a1a145a7d21129d0c9974b5fbf3aa0e5ef88b17f9c3dd13b8fc886e9a3883c07ddb771d65978a5800591024a237005a0a75c636ceba410fee059fb54cfc1102d813d5017d85e8e1217725cc5ea89fd5ba02f926cb3b238b498fadeaf081c22abc0ef3c4ec65274272b4a7fc3f933b94643a06f4a46d0e189d70e20f2036bbd9d283c9590f3b8e0a5d6a6143e344ad92971a5a0f55b3d8e760a9437f36bf4505d636d5b90059afecd6255b7a0c7ef380e915ed2a0abdfa11f706949a12a8bf6f85364abdc4802f405a6005b147e642f60e533e447a048d323086932e06fc990e2984af14055b2d5ce9c9cbd55e530d3366e65f6383ba07b6b7cd4fb194b1180ed2231487726c6a59860b7feccfd4adce5ee60869e37b8a06d84c9cb3af0ee04567fcafde8cfb55ee9aa2c3e7c29d32cfcbf23f7ccbf148180",
    "0xf90211a05b83dcd2a2ffb1b8e608a83834d5b2495a0797c3b84d1cef76d57284b425bd29a019fd2bc7b5ecd4cb92b86dd8c2e0aa8276ea785c79ac6c5e5005f431e4bf025da0c7ac79328bd010e2a0c495904b5b56839eb490ec1a458542de1d4ab04f7f0a61a056b583ce5ad86b38e5e87fc653f1e818f659316bf9496e842281321d124d93eca0ab654c9715eb1d0739567b7e01c3461d4e868954db96a6ab7b0588d02ee6718ba03100d6217fe83e6364532a0a446cf7d404344de0faf673cac7dbb669a99c122ba0303cfca6da727c8bc50814903be9e06e1adea92912f7aa46f9998ba48af7b682a0a1cadbb57acfd18f8e3430f2bbf001e9778debabf961e59570a31f1212c203a3a0a54c0ae8e47cc666a4e34196a486a96cd1d90676a069eaa79545aa094e5d9c7ea09d20569ec817de554538336a30b8e425268e716d8cfc65133f3e3ec6ef9473c5a091f462dcb944611db5e8c155044a5e23b17b4d351ee589ae5ebd92953a067030a088e8d30da5a3e4b4d0fc3c33d0420d8e8b868760519b5564ad986d12bddaba7ea0660b4ff5a2606a2f44883b951bddd6c3788bbb17ba5bf094a43c6333e5a83286a0d710e03a9dea08c93f642c83fce0b39ce86eb464d10379903b4be29fa3ec54b2a0860c85a6566fc278aa68c2ce862a42b7bab5d7e7835c09f88667e7eafc592a95a07eedb850ca608638a64bcc201bb9b7cd0c6c4c4cd83eb22e40e94752582e0f3e80",
    "0xf90211a0b1e786952278d90971a8e3a50cda664e4f34a4f26c44d6b057c51d1d8a903708a0fa44dc90523ac4504ace7c37f84bdbef14fcc4b326e23170e24e1afe2fdd2ea0a02324a64eaded6f457c1ae0c5fd10c0f901399f556e1cc4a2171448877bff33b8a0464d43418f93847fb63237f9766fe5b5a017beb542e68ec501146403d15a17d1a0ffdc2bc73ee5b28f03b8025cf46ac531b02dace39ebe0f756997385a0cf756aaa0636bea030d5dec04ea4fa6d07e69a67e0160beb6975dbc1ddd2b12f3d175651ea04c0894212e7b793fef55db0c2be1e860193f1e17b39bd4c67864e5c73ff45be1a0f6790d252186194feb33b81ab2755dbe7c4ef50fde94dd9f89579cade404a875a043902dc2af37ac1a19a2bc58f46bf37582b86e0278f9a8cbecee2aa7fa024f5ba085378baa486ed6451eaf1dbad8beb4ae40d2b9009a1a7a7a0a41850397376a3da0a205aead40a8dc10ba3ba036eb4014e7c81ed201db594c4b1b64de54208eb052a07e75929a7bc550da84dcdee7969840d4bd39166e7734bd1c186f2695a4993fbca081bdf48ad8cd4bf28d9c609d09645369518c5f9f2fe611314d3686561e422aeaa0fe11b90489c5604b8e40f9f617e944f75ab7659f2896e7f8fcfa079bf3ebaa8da0e6ce4b44294bac7460768e473499319b456ae31f690fa40347e49208a6624012a0eac1f4056c971f49cc6978a0bd3c930d245630100722c8865e91f9f8acba41be80",
    "0xf8f1a085b11c8038233f8e07da2fda003c92e2ec740b190a1e4ea4af1cafda22480b7a80a017083600e7d0a2f2070389e87795b7de2c3684c8129fc520398f90aaa43844cba01158248190616e119c2d348592699ba3af2f80cb09bf3d7dbb62088c3656dfe6a008f2956683f5466c8bbc1f1b5c233d641d12a37d948a0dbf95e65ea295b596de80a0ebc30dd9e8380c85957ddf6b3cf843da692587ee934d068ef92c3b39ebdc4c5a808080a0468a8624d40f0ef22fa41608b50db3a1169a4c814946b69b10f894d1b73cc476808080a0e7c44fa3342e3167176fd62f811f07b4b6d4a673085c08bc94df65d98375bf348080",
    "0xf8709d3f01edc6d4c93d7008621de1ffcec7a9c3f831b0589be966d1bfec2f4cb850f84e81d18902cd9647ca465c1615a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
  ],
  "address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
  "balance": "0x2cd9647ca465c1615",
  "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  "nonce": "0xd1",
  "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  "storageProof": [
    {
      "key": "0x0",
      "proof": [],
      "value": "0x0"
    }
  ]
};

(async () => {
  const block = await web3.eth.getBlock(15075810);
  await verifyAccount("0xab5801a7d398351b8be11c439e05c5b3259aec9b", proof.accountProof, block.stateRoot);
})();