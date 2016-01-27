<?php

/**
 * Fancy Dev Build base class
 *
 * @package DevTasks
 *
 */
class DevTasks extends LeftAndMainExtension implements PermissionProvider
{

    public function init()
    {
        parent::init();

        if (!Permission::check("VIEW_DEVTASKS")) return;

        $tasks = array(
            'devbuild' => array(
                'title' => 'Dev/Build',
                'link' => 'dev/build',
                'reset_time' => '5000',
                'error_handler' => 'newtab',
                'success_handler' => 'ignore'
            )
        );

        $config_tasks = Config::inst()->get(__CLASS__, 'tasks');

        if (is_array($config_tasks)) {
            $tasks = array_merge($tasks, $config_tasks);
        }

        foreach ($tasks as $item => $values) {

            $attributes = array(
                'class' => 'devbuild-trigger',
                'data-title' => (isset($values['title']) ? $values['title'] : $item),
                'data-link' => (isset($values['link']) ? $values['link'] : 'dev/build'),
                'data-reset-time' => (isset($values['reset_time']) ? $values['reset_time'] : '5000'),
                'data-error-handler' => (isset($values['error_handler']) ? $values['error_handler'] : 'newtab'),
                'data-success-handler' => (isset($values['success_handler']) ? $values['success_handler'] : 'ignore')
            );

            // priority controls the ordering of the link in the stack. The
            // lower the number, the lower in the list
            $priority = -90;

            CMSMenu::add_link($item, '', '#', $priority, $attributes);

        }
    }

    public function providePermissions()
    {
        return array(
            "VIEW_DEVTASKS" => "Access dev task menu",
        );
    }

}

?>
