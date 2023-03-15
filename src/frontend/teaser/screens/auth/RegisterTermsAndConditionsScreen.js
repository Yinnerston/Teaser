import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { useAtom } from "jotai";
import { userTCAcceptedAtom } from "../../hooks/auth/useUserAuth";

export default function RegisterTermsAndConditionsScreen({ navigation }) {
  const [isChecked, setIsChecked] = useAtom(userTCAcceptedAtom);
  const Bold = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );
  return (
    <ScrollView>
      <Text>
        <Bold>1. Acceptance of Terms:</Bold> By using the Teaser application,
        you agree to be bound by these Terms and Conditions. If you do not agree
        to all of the Terms, then you may not use Teaser.
        {"\n"}
        <Bold>2. Age Requirement:</Bold> You must be 18 years of age or older to
        use Teaser. If you are under 18 years of age, you may not use Teaser and
        must immediately discontinue any use of Teaser.
        {"\n"}
        <Bold>3. Government ID:</Bold> You agree to provide a government issued
        ID as proof of your age before posting content to Teaser. Teaser will
        only use the document for age verification.
        {"\n"}
        <Bold>4. Communication Preferences:</Bold> By using the Website, you
        expressly and specifically consent to receiving electronic
        communications from us relating to your account. Communication may
        involve SMS messages from Teaser or notifications within the app.
        {"\n"}
        <Bold>5. Content:</Bold> You are solely responsible for the content that
        you post on Teaser. "Content" includes the text, software, scripts,
        graphics, photos, sounds, music, videos, audiovisual combinations,
        interactive features, textual content, and other materials you may view,
        upload, publish, submit, make available, display, communicate or post on
        the Website. You agree to not post any content discriminatory against
        race, religion or sexual orientation. Sexual content featuring minors is
        not allowed on the platform.
        {"\n"}
        <Bold>6. User Conduct:</Bold> You agree not to use Teaser for any
        unlawful purpose or to engage in any activities that are prohibited by
        these Terms.
        {"\n"}
        <Bold>7. Termination:</Bold> Teaser reserves the right to terminate your
        account at any time for breaching the terms outlined in the Terms and
        Conditions.
        {"\n"}
        <Bold>8. Limitation of Liability:</Bold> We will not be liable if for
        any reason all or any part of the Website is unavailable at any time or
        for any period. From time to time, we may restrict access to some parts
        of the Website, or the entire Website, to Users, including registered
        Users. Although the Website will not be liable for your losses caused by
        any unauthorized use of your account, you may be liable for the losses
        of the Website or others due to such unauthorized use.
        {"\n"}
        <Bold>9. Modification of Terms:</Bold> Teaser reserves the right to
        modify these Terms at any time in its sole discretion. Any modifications
        made to these Terms will be effective immediately upon posting of the
        modified Terms and users will be updated on the new Terms and
        Conditions.
        {"\n"}
        <Bold>10. Contact:</Bold> All questions or comments may be directed to
        the Teaser customer service department at{" "}
        <Bold>help@teasernsfw.com</Bold>.
      </Text>
      <View style={styles.checkboxTCContainer}>
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={() => setIsChecked(!isChecked)}
        ></Checkbox>
        <Text>I agree to the Terms and Conditions.</Text>
      </View>
      <Button
        onPress={
          isChecked
            ? () => {
                navigation.goBack();
              }
            : () => {}
        }
        color={isChecked ? "red" : "gray"}
        title="Accept T&C"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkboxTCContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
