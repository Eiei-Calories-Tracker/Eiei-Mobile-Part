import { USER_API } from "@/src/services/userService";
import { useAuthStore, UserData } from "@/src/utils/authStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RadioButton } from "react-native-paper";
type props = {
  editState: boolean;
};
const style = StyleSheet.create({
  textinput: {
    // backgroundColor: "gray",
    borderBottomColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    marginBlock: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

type CurrentUserDataType = {
  email: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  activity_factor:
    | "sedentary"
    | "lightly_active"
    | "moderately_active"
    | "very_active"
    | "extra_active";
  weight: number;
  height: number;
  target: "lose_weight" | "maintain_weight" | "gain_weight";
  birth_date: Date;
};
export const ProfileContainer = ({ editState }: props) => {
  const { userData, accessToken, setUserData } = useAuthStore();
  console.log("userdata", userData);
  const router = useRouter();
  const [isChange, setIsChange] = useState(false);
  async function updateUser() {
    console.log(accessToken);
    console.log("current user data", currentUserData);
    const res = await USER_API.updateUserProfile(
      accessToken ?? "",
      currentUserData,
    );
    console.log("res", res);
    setUserData(res);
    router.push("/setting");
  }
  const [currentUserData, setCurrentUserData] = useState<UserData>({
    email: "",
    birth_date: "",
    activity_factor: "",
    gender: "male",
    height: 0,
    weight: 0,
    first_name: "",
    last_name: "",
    target: "",
  });
  useEffect(() => {
    setIsChange(JSON.stringify(currentUserData) !== JSON.stringify(userData));
  }, [currentUserData, userData]);
  useEffect(() => {
    if (userData) {
      setCurrentUserData(userData);
    }
  }, [userData]);
  const [date, setDate] = useState(
    currentUserData.birth_date
      ? new Date(currentUserData.birth_date)
      : new Date(),
  );
  const [show, setShow] = useState(false);
  return (
    <ScrollView style={{ paddingInline: 30, marginTop: 10 }}>
      <View>
        <View>
          <Text style={style.text}>First Name</Text>
          <TextInput
            editable={false}
            value={currentUserData.first_name}
            style={[
              style.textinput,
              { backgroundColor: "#f0f0f0", color: "#888" },
            ]}
          />
        </View>
        <View>
          <Text style={style.text}>Last Name</Text>
          <TextInput
            editable={false}
            value={currentUserData.last_name}
            onChangeText={(text) =>
              setCurrentUserData({ ...currentUserData, last_name: text })
            }
            style={[
              style.textinput,
              { backgroundColor: "#f0f0f0", color: "#888" },
            ]}
          />
        </View>
      </View>
      <View>
        <Text style={style.text}>Email</Text>
        <TextInput
          editable={false}
          value={currentUserData.email}
          onChangeText={(text) =>
            setCurrentUserData({ ...currentUserData, email: text })
          }
          style={[
            style.textinput,
            { backgroundColor: "#f0f0f0", color: "#888" },
          ]}
        />
      </View>
      <View>
        <Text style={style.text}>Gender</Text>
        <RadioButton.Group
          value={currentUserData.gender}
          onValueChange={(val) =>
            setCurrentUserData({ ...currentUserData, gender: val })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="male" />
            <Text>Male</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="female" />
            <Text>Female</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View>
        <Text style={style.text}>Activity Factor</Text>

        <RadioButton.Group
          value={currentUserData.activity_factor}
          onValueChange={(val) =>
            setCurrentUserData({ ...currentUserData, activity_factor: val })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="sedentary" />
            <Text>Sedentary</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="lightly_active" />
            <Text>Lightly Active</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="moderately_active" />
            <Text>Moderately Active</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="very_active" />
            <Text>Very Active</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="extra_active" />
            <Text>Extra Active</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View>
        <Text style={style.text}>Weight</Text>
        <TextInput
          editable={editState}
          style={style.textinput}
          keyboardType="numeric"
          value={String(currentUserData.weight)}
          onChangeText={(text) =>
            setCurrentUserData({
              ...currentUserData,
              weight: Number(text) || 0,
            })
          }
        />
      </View>
      <View>
        <Text style={style.text}>Height</Text>
        <TextInput
          editable={editState}
          style={style.textinput}
          keyboardType="numeric"
          value={String(currentUserData.height)}
          onChangeText={(text) =>
            setCurrentUserData({
              ...currentUserData,
              height: Number(text) || 0,
            })
          }
        />
      </View>
      <View>
        <Text style={style.text}>Target</Text>

        <RadioButton.Group
          value={currentUserData.target}
          onValueChange={(val) =>
            setCurrentUserData({ ...currentUserData, target: val })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="lose_weight" />
            <Text>Lose Weight</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="maintain_weight" />
            <Text>Maintain Weight</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="gain_weight" />
            <Text>Gain Weight</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={{ marginBottom: isChange ? 0 : 50 }}>
        <Text style={style.text}>Birth Date</Text>

        <TouchableOpacity onPress={() => setShow(true)} style={style.textinput}>
          <Text>
            {currentUserData.birth_date &&
              new Date(currentUserData.birth_date).toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={
              currentUserData.birth_date
                ? new Date(currentUserData.birth_date)
                : new Date()
            }
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShow(false);

              if (event.type === "dismissed") return;

              if (selectedDate) {
                setDate(selectedDate);
                setCurrentUserData({
                  ...currentUserData,
                  birth_date: selectedDate.toISOString().split("T")[0], // store as string
                });
              }
            }}
          />
        )}
      </View>
      {isChange && (
        <TouchableOpacity
          onPress={async () => await updateUser()}
          style={{
            backgroundColor: "green",
            alignItems: "center",
            padding: 10,
            marginTop: 5,
            borderRadius: 10,
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
