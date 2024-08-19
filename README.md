BlackSecure EHR System
Overview
BlackSecure is an Ethereum-based Electronic Health Record (EHR) system designed to securely manage patient records, healthcare provider interactions, and insurance-related data on the blockchain. The system leverages smart contracts to ensure data integrity, confidentiality, and accessibility, enabling patients, doctors, and administrators to interact with health records in a decentralized and secure environment.

Project Goals
The primary goals of this project are:

Decentralization: Store and manage patient data on the Ethereum blockchain to prevent unauthorized access and ensure data integrity.
Security: Utilize cryptographic methods (such as IPFS hashes) to securely store and retrieve sensitive patient information.
Role-based Access: Implement a role-based access control system to ensure that only authorized users (e.g., doctors, patients, admins) can interact with specific data.
Transparency: Enable patients to control access to their data and monitor who has access.
Automation: Use smart contracts to automate tasks like patient registration, data transfer between doctors, and insurance processing.
Project Components
1. Smart Contracts
ComprehensivePatientData.sol: The core smart contract that manages patient data, doctor assignments, and IPFS data storage.

registerPatient: Registers a new patient and assigns them to a doctor.
transferPatient: Transfers a patient to a new doctor.
getPatientDetails: Retrieves patient details (only accessible by the assigned doctor or owner).
setPatientData: Stores IPFS hash for a patient's data (only accessible by the assigned doctor or owner).
getPatientData: Retrieves IPFS hash for a patient's data.
UserData.sol: A base contract that handles the storage and retrieval of user information.

registerUser: Registers user information.
getUserInfo: Retrieves user information.
IPFSData.sol: A contract for managing the IPFS hash associated with user data.

setIPFSHash: Associates an IPFS hash with a user's address.
getIPFSHash: Retrieves the IPFS hash associated with a user's address.
2. Frontend
The frontend is a React-based web application that interacts with the smart contracts deployed on the Ethereum network. It provides a user interface for doctors, patients, and admins to perform actions such as registering patients, transferring patient data, and viewing patient records.

Key Components:
DoctorDashboard.js: Displays a list of patients assigned to the doctor and provides functionalities to manage them.
PatientDashboard.js: Allows patients to view their records and manage permissions.
Register.js: A form interface for registering new patients and assigning them to doctors.
TransferData.js: A form for transferring a patient from one doctor to another.
FetchData.js: A component for retrieving patient data from the blockchain.
3. Backend Interaction Scripts
interact.mjs: A Node.js script that interacts with the deployed smart contracts, allowing for tasks such as registering patients, transferring patients, and storing data on IPFS.

registerPatient: Calls the smart contract to register a patient.
transferPatient: Calls the smart contract to transfer a patient to a new doctor.
fetchPatientData: Retrieves patient details from the smart contract.
storeData: Stores patient data on IPFS and associates it with their Ethereum address.
deploy.js: A script used to deploy the smart contracts to the Ethereum network.

4. Environment Configuration
The project uses environment variables for sensitive information such as API keys, private keys, and contract addresses. These are stored in a .env file that is not included in the repository for security reasons.

5. Testing
The project includes testing scripts (e.g., UserDataTest.mjs) that utilize the Hardhat framework to test the functionality of the smart contracts. The tests cover various scenarios such as patient registration, data retrieval, and access control.

Challenges and Resolutions
1. ABI Misalignment
Challenge: One of the major issues encountered was the misalignment between the ABI used in the frontend and the actual functions available in the smart contract. This led to errors such as contract.registerPatient is not a function.

Resolution: We ensured that the correct ABI was used by importing the appropriate ABI files in the frontend and backend scripts. By reviewing the ABI files and confirming the functions' existence, we were able to align the frontend with the backend.

2. Function Naming Conflicts
Challenge: Another challenge was the confusion between function names in the frontend code and the smart contracts. For example, the frontend was calling transferData when no such function existed in the smart contract, leading to runtime errors.

Resolution: We audited the smart contracts and updated the frontend code to call the correct functions, such as registerUser, transferPatient, and setIPFSHash, ensuring that the frontend accurately reflects the contract's capabilities.

3. Role-Based Access Control
Challenge: Implementing role-based access control within the smart contracts and ensuring that the frontend enforces these roles was complex.

Resolution: We introduced user roles (Doctor, Patient, Admin) in the smart contracts and modified the frontend to respect these roles, only allowing authorized actions based on the user's role.

4. Data Storage and Retrieval
Challenge: Storing and retrieving data on IPFS while ensuring the security and privacy of patient records was a critical requirement.

Resolution: We implemented IPFS for decentralized data storage and integrated it with the Ethereum smart contracts to ensure that only authorized users can access and manage this data.

5. Testing and Deployment
Challenge: Ensuring that all components work seamlessly together required extensive testing.

Resolution: We wrote comprehensive unit tests and integration tests to cover all critical functionalities. The smart contracts were deployed to the Sepolia testnet for testing purposes, and the frontend was deployed to a local development environment.

Future Steps
1. Finalizing Frontend UI/UX
Once the backend interactions are fully functional and tested, the next step is to finalize the frontend design, making it user-friendly and intuitive for doctors and patients.

2. Full System Deployment
After successful testing, the smart contracts will be deployed to the Ethereum mainnet or another desired network, and the frontend will be hosted on a platform like Vercel or Netlify.

3. Adding More Features
Future features may include:

Integration with insurance companies for claims processing.
A notification system for patients and doctors.
Enhanced security features such as multi-factor authentication.
Conclusion
This project is an ongoing effort to create a secure, decentralized, and user-friendly EHR system on the Ethereum blockchain. We have made significant progress in developing the smart contracts, frontend, and backend interaction scripts, and are currently focused on resolving the remaining issues and refining the system for deployment.

We welcome contributions and feedback from the community as we continue to develop and improve BlackSecure.




STEPS TO EXECUTE MY PROGRAM AND SEE ON LOCALHOT

OPEN THE ROOT PROJECT ON VS CODE THEN FOLLOW THE STEPS ON TERNINAL

STEP 1  : npx hardhat compile
STEP 2  :npx hardhat run scripts/deploy.js --network private
STEP 3  :npx hardhat test
STEP 4  :node scripts/storedata.js
STEP 5  :node scripts/retrievedata.js
STEP 6  :node scripts/interact.mjs
STEP 7  :node scripts/storeinipfs.cjs
STEP 8  :node scripts/retrievefromipfs.js
STEP 9  :node scripts/storeipfshash.cjs
STEP 10 :npm start

