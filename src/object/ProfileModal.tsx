import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Typography, Grid, Button, Box, Modal } from "@material-ui/core";
import { ListProfileInterface } from "./ProfileListCard";
import CloseIcon from "@material-ui/icons/Close";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";

/**
 * ユーザープロフィールのモーダル
 * @param prof
 */

const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      width: "80%",
      maxWidth: "680px",
      padding: "16px",
      margin: "40px auto",
      overflow: "auto",
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
    },
    closeIcon: {
      position: "fixed",
      top: "12px",
      right: "12px",
    },
    imageWrapper: {
      width: "30%",
      height: "100%",
      position: "relative",
      padding: "0 24px",
      overflow: "hidden",
      marginTop: "22px",
    },
    image: {
      width: "100%",
      position: "relative",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
    },
    prevIcon: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
    },
    nextIcon: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
    },
    contents: {
      marginLeft: "20px",
      flex: "1",
    },
    name: {
      fontSize: "20px",
    },
    profile: {
      marginTop: "12px",
      fontSize: "12px",
    },
  })
);

function ProfileModal(prof: ListProfileInterface) {
  const styles = modalStyles();
  return (
    <Paper className={styles.modal}>
      <CloseIcon className={styles.closeIcon} />
      <Box className={styles.imageWrapper}>
        <NavigateBefore className={styles.prevIcon} />
        <img className={styles.image} src={prof.modalImage} alt="" />
        <NavigateNext className={styles.nextIcon} />
      </Box>
      <Box className={styles.contents}>
        <p className={styles.name}>{prof.name}</p>
        <p className={styles.profile}>{prof.profile}</p>
        <Box display="flex">
          <Button
            style={{ marginLeft: "auto" }}
            color="secondary"
            variant="outlined"
          >
            チャット開始
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileModal;
