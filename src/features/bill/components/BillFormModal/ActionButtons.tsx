import React from "react";
import { Button, Space } from "antd";
import { useGlobalTranslation } from "../../../../contexts/TranslationContext";
import { BillFormModalConstants } from "./BillFormModalConstants"; // Import the constants
import { Bill } from "../../../../types/Bill"; // Make sure this is imported for type checking
import styles from "./BillFormModal.module.css";

interface ActionButtonsProps {
  initialValues: Bill | null;
  isDarkMode: boolean;
  onCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  initialValues,
  isDarkMode,
  onCancel,
}) => {
  const t = useGlobalTranslation();

  // Determine button styles for dark/light mode
  const submitButtonClass = `${styles.submitButton} ${isDarkMode ? styles.darkButton : styles.lightButton
    }`;
  const cancelButtonClass = `${styles.cancelButton} ${isDarkMode ? styles.darkButton : styles.lightButton
    }`;

  return (
    <Space className={styles.buttonContainer}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className={submitButtonClass}
      >
        {initialValues
          ? t(BillFormModalConstants.updateBill)
          : t(BillFormModalConstants.addBill)}
      </Button>
      <Button
        type="default"
        onClick={onCancel}
        size="large"
        className={cancelButtonClass}
      >
        {t(BillFormModalConstants.cancel)}
      </Button>
    </Space>
  );
};

export default ActionButtons;
