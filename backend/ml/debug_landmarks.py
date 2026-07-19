from ml.preprocessing.dataset import load_landmarks

landmarks = load_landmarks()

print("Number of samples:", len(landmarks.files))

key = landmarks.files[0]
print("First key:", key)

sample = landmarks[key]
first_frame = sample[0]

print("Shape:", sample.shape)

print("First frame shape:", sample[0].shape)

print("First 10 landmarks:")
for i in range(10):
    print(i, sample[0][i])

print("Landmark 467:", sample[0][467])
print("Landmark 468:", sample[0][468])
print("Landmark 500:", sample[0][500])
print("Landmark 501:", sample[0][501])
print("Landmark 521:", sample[0][521])
print("Landmark 522:", sample[0][522])
print("Landmark 542:", sample[0][542])
print("Landmark 552:", sample[0][552])
print("\nPOSE START")
for i in range(468, 501):
    print(i, first_frame[i])

print("\nLEFT HAND START")
for i in range(501, 522):
    print(i, first_frame[i])

print("\nRIGHT HAND START")
for i in range(522, 543):
    print(i, first_frame[i])